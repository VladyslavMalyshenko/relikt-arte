from sqlalchemy import Index
from sqlalchemy.orm import Mapped, mapped_column, declared_attr

from ..core.db.mixins import BaseModelMixin


class BaseProductRelMixin(BaseModelMixin):
    instance_name = None

    name: Mapped[str] = mapped_column(
        nullable=False,
        doc="Name",
    )
    active: Mapped[bool] = mapped_column(default=True, doc="Is active")

    @declared_attr
    def __table_args__(cls):
        (
            Index(
                f"ix_{cls.__tablename__}_name_active",
                "name",
                "active",
            ),
        )

    def __str__(self) -> str:
        return f"{self.instance_name}: {self.name}"
