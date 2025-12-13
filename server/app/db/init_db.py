import asyncio
from app.service.db_session import engine
from app.model.base import Base
from app.db.init_models import *  # 👈 THIS is the key line


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_db())
