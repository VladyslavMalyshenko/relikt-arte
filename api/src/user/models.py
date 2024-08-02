import uuid

from enum import Enum as PyEnum

from sqlalchemy import String, event
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import UUID, ENUM

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from ..utils.hashing import Hashing

from .enums import UserRole


class User(BaseModelMixin, Base):
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        doc="User ID",
    )
    full_name: Mapped[str] = mapped_column(
        nullable=True, index=True, doc="Full name"
    )
    email: Mapped[str] = mapped_column(
        nullable=False, unique=True, index=True, doc="Email"
    )
    phone: Mapped[str] = mapped_column(
        String(length=15), nullable=False, index=True, doc="Phone number"
    )
    password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[PyEnum] = mapped_column(
        ENUM(UserRole, name="user_role"),
        nullable=False,
        index=True,
        default=UserRole.CUSTOMER,
        doc="Role",
    )
    is_active: Mapped[bool] = mapped_column(
        nullable=False, index=True, default=True, doc="Is active"
    )

    @hybrid_property
    def is_admin(self):
        return self.role == UserRole.ADMIN

    def check_password(self, password: str) -> bool:
        return Hashing.verify_password(password, self.password)

    def __str__(self) -> str:
        return f"User: {self.email}. Role: {self.role}"


@event.listens_for(User.password, "set", retval=True)
def hash_user_password_before_insert(target, value, oldvalue, initiator):
    if value != oldvalue:
        return Hashing.get_hashed_password(value)
    return value
