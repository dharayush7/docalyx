import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Text, DateTime, Boolean, func
from sqlalchemy.dialects.postgresql import UUID
from .base import Base


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    chat_id: Mapped[int] = mapped_column(
        ForeignKey("chats.id", ondelete="CASCADE"),
        index=True
    )

    role: Mapped[str]

    content: Mapped[str] = mapped_column(Text)

    is_summary: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default="false"
    )

    chat: Mapped["Chat"] = relationship(
        back_populates="messages"
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
