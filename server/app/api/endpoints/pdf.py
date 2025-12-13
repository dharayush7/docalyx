from fastapi import APIRouter, Request
from app.service import r2_service

router = APIRouter()


@router.post("/read")
async def read_pdf(req: Request):
    body = await req.json()
    key = body.get("key")
    url = r2_service.get_object(key)
    return {"message": "success", "data": url}
