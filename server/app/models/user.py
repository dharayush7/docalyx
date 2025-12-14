import uuid
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, func
from app.model.base import Base


class User(Base):
    __tablename__ = "users"

    # Prisma cuid() → use UUID string in SQLAlchemy
    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    kindeUserId: Mapped[str] = mapped_column(
        "kinde_user_id",
        String(255),
        unique=True,
        nullable=False
    )

    avaterUrl: Mapped[str | None] = mapped_column(
        "avatar_url",
        String(500),
        nullable=True
    )

    createdAt: Mapped[DateTime] = mapped_column(
        "created_at",
        DateTime(timezone=True),
        server_default=func.now()
    )

    updatedAt: Mapped[DateTime] = mapped_column(
        "updated_at",
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
