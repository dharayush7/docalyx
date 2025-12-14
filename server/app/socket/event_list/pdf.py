from app.socket.server import sio
from app.service import r2_service, pdf_service, vector_service


@sio.event
async def read_pdf(sid, data):
    user_id: str = data.get("user_id")
    pdf_key: str = data.get("pdf_key")

    url = r2_service.get_object(pdf_key)
    split_docs = pdf_service.pdf_to_spilatted_docs(url)

    id = pdf_key.split(".")
    id.pop()

    vector_service.create_vector_store(split_docs, id[0])
    await sio.emit("pdf_read_response", {"status": "success"}, to=sid)
