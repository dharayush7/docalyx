import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime, Boolean, func, Index
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    chat: Mapped["Chat | None"] = relationship(
        back_populates="document",
        uselist=False,
        cascade="all"
    )

    is_vectorized: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default="false"
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
        Index("ix_documents_vectorized", "is_vectorized"),
    )
