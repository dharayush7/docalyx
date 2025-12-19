from app.models.chat import Chat
from app.models.message import Message
from app.socket.server import sio
from app.service import db_session, gemini_services, vector_service, openai_service
from sqlalchemy import select
import asyncio


@sio.event
async def message(sid, data):
    async with db_session.AsyncSessionLocal() as db:
        try:
            chat_id: str | None = data.get("chat_id")
            query: str | None = data.get("query")

            if not chat_id or not query:
                await sio.emit(
                    "message_response",
                    {"status": "error", "message": "Invalid chat ID or query"},
                    to=sid
                )
                return

            message_result = await db.execute(
                select(Chat).where(Chat.id == chat_id)
            )
            chat: Chat | None = message_result.scalar_one_or_none()

            if not chat:
                await sio.emit(
                    "message_response",
                    {"status": "error", "message": "Message not found"},
                    to=sid
                )
                return

            old_messages_result = await db.execute(
                select(Message).where(Message.chat_id == chat.id)
                .where(Message.role != "query")
                .order_by(
                    Message.created_at.desc())
                .limit(30)
            )
            old_messages = list(old_messages_result.scalars().all())
            old_messages.reverse()

            openai_messages = []

            for msg in old_messages:
                if msg.role == "query":
                    continue
                elif msg.role == "summary":
                    openai_messages.clear()
                    openai_messages.append(
                        {"role": "user", "content": f"Summary of previous conversation:\n{msg.content}"})
                else:
                    openai_messages.append(
                        {"role": msg.role, "content": msg.content})

            if len(old_messages) == 19:

                context = ""

                for msg in old_messages:
                    context += f"-{msg.role}: {msg.content}\n"

                summary = await asyncio.to_thread(
                    gemini_services.get_summary,
                    context
                )

                new_message = Message(
                    content=summary, role="summary", chat_id=chat.id, is_summary=True)

                db.add(new_message)
                await db.commit()

                openai_messages.clear()
                openai_messages.append(
                    {"role": "user", "content": f"Summary of previous conversation:\n{summary}"})

            user_query = await asyncio.to_thread(
                gemini_services.understand_query,
                query
            )

            relevant_docs = await asyncio.to_thread(
                vector_service.search_vector_store,
                user_query["query"],
                chat.document_id
            )

            context = "\n\n".join(
                [f"Page content: {doc.page_content}\nPage number: {doc.metadata.get('page_label', 'unknown')}" for doc in relevant_docs])

            openai_messages.append(
                {"role": "user",
                    "content": f"Context:\n{context}\n\n\nUser query: {user_query['query']}\n\nInstructions: {user_query['instraction']}"}
            )

            new_msg = Message(
                content=openai_messages[-1]["content"], role="user", chat_id=chat.id)

            db.add(new_msg)

            response = await asyncio.to_thread(
                openai_service.generate_response,
                openai_messages
            )

            ast_msg = Message(
                content=response, role="assistant", chat_id=chat.id)

            db.add(ast_msg)
            await db.commit()
            db.refresh(ast_msg)

            # print(f"Response: {response}")

            await sio.emit(
                "message_response",
                {"status": "success", "data": {
                    "id": str(ast_msg.id),
                    "chat_id": str(ast_msg.chat_id),
                    "role": ast_msg.role,
                    "content": ast_msg.content,
                    "is_summary": ast_msg.is_summary,
                    "created_at": ast_msg.created_at.isoformat(),
                    "updated_at": ast_msg.updated_at.isoformat()
                }},
                to=sid
            )

        except Exception as e:
            await sio.emit(
                "message_response",
                {"status": "error", "message": str(e)},
                to=sid
            )
            raise e
