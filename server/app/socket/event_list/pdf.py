import asyncio
from sqlalchemy import select
from app.socket.server import sio
from app.service import (
    r2_service,
    pdf_service,
    vector_service,
    gemini_services,
    db_session
)
from app.models.chat import Chat
from app.models.user import User


@sio.event
async def read_pdf(sid, data):
    async with db_session.AsyncSessionLocal() as db:
        try:
            user_id: str | None = data.get("user_id")
            pdf_key: str | None = data.get("pdf_key")

            if not user_id or not pdf_key:
                await sio.emit(
                    "pdf_read_response",
                    {"status": "error", "message": "Invalid input"},
                    to=sid
                )
                return

            result = await db.execute(
                select(User).where(User.kinde_user_id == user_id)
            )
            user: User | None = result.scalar_one_or_none()

            if not user:
                await sio.emit(
                    "pdf_read_response",
                    {"status": "error", "message": "User not found"},
                    to=sid
                )
                return
            url = r2_service.get_object(pdf_key)

            split_docs = await asyncio.to_thread(
                pdf_service.pdf_to_spilatted_docs,
                url
            )

            document_id = pdf_key.rsplit(".", 1)[0]

            await asyncio.to_thread(
                vector_service.create_vector_store,
                split_docs,
                document_id
            )

            context = "\n\n".join(
                doc.page_content for doc in split_docs[:4]
            )

            title = await asyncio.to_thread(
                gemini_services.get_generated_title,
                context
            )
            chat = Chat(
                user_id=user.id,
                name=title,
                document_id=document_id
            )

            db.add(chat)
            await db.commit()
            await db.refresh(chat)

            await sio.emit(
                "pdf_read_response",
                {
                    "status": "success",
                    "chat_id": str(chat.id),
                    "title": title
                },
                to=sid
            )

        except Exception as e:

            print("read_pdf error:", e)

            await sio.emit(
                "pdf_read_response",
                {
                    "status": "error",
                    "message": "Failed to process PDF"
                },
                to=sid
            )
