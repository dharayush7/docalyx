from fastapi import APIRouter, Request
from app.service import r2_service, pdf_service, vector_service

router = APIRouter()


@router.post("/read")
async def read_pdf(req: Request):
    body = await req.json()
    key: str = body.get("key")

    url = r2_service.get_object(key)
    split_docs = pdf_service.pdf_to_spilatted_docs(url)

    id = key.split(".")
    id.pop()
    vector_service.create_vector_store(split_docs, id[0])

    return {"message": "success", "data": url}
