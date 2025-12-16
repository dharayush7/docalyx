import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    kinde_user_id: Mapped[str] = mapped_column(
        "kinde_user_id",
        String(255),
        unique=True,
        nullable=False
    )

    avater_url: Mapped[str | None] = mapped_column(
        "avatar_url",
        String(500),
        nullable=True
    )

    created_at: Mapped[DateTime] = mapped_column(
        "created_at",
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        "updated_at",
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    chats: Mapped[list["Chat"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )
