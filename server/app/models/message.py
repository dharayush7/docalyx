import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import (
    ForeignKey,
    Text,
    DateTime,
    Boolean,
    func,
    Index,
)
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    chat_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("chats.id", ondelete="CASCADE"),
        index=True,
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    content: Mapped[str] = mapped_column(Text, nullable=False)

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

    __table_args__ = (
        Index("ix_messages_chat_summary", "chat_id", "is_summary"),
    )
