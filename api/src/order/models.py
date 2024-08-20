import uuid

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from ..user.models import User
from ..product.models import (
    Product,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
    ProductSize,
)


class Basket(BaseModelMixin, Base):
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=True,
        index=True,
        doc="User ID",
    )

    session_id: Mapped[str] = mapped_column(
        nullable=True,
        index=True,
        doc="Session ID",
    )

    items: Mapped[list["BasketItem"]] = relationship(
        "BasketItem",
        backref="basket",
        cascade="all, delete-orphan",
    )

    @hybrid_property
    def total_value(self):
        return sum(item.total_price for item in self.items)

    @hybrid_property
    def total_items(self):
        return sum(item.quantity for item in self.items)


class BasketItem(BaseModelMixin, Base):
    basket_id: Mapped[int] = mapped_column(
        ForeignKey("basket.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        index=True,
        doc="Basket ID",
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("product.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
        index=True,
        doc="Product ID",
    )
    color_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_color.id",
            ondelete="SET NULL",
            onupdate="CASCADE",
        ),
        nullable=True,
        index=True,
        doc="Color ID",
    )
    size_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_size.id",
            ondelete="SET NULL",
            onupdate="CASCADE",
        ),
        nullable=True,
        index=True,
        doc="Size ID",
    )
    covering_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_covering.id",
            ondelete="SET NULL",
            onupdate="CASCADE",
        ),
        nullable=True,
        index=True,
        doc="Covering ID",
    )
    glass_color_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_glass_color.id",
            ondelete="SET NULL",
            onupdate="CASCADE",
        ),
        nullable=True,
        index=True,
        doc="Glass color ID",
    )

    quantity: Mapped[int] = mapped_column(
        nullable=False,
        doc="Quantity",
    )

    product: Mapped[Product] = relationship(
        backref="basket_items",
    )

    @hybrid_property
    def total_price(self):
        return self.product.price * self.quantity


# Order statuses
# 1 - Новый заказ (Красный)
# 2 - Принятый заказ (Желтый)
# 3 - Готовый к отгрузке (Зеленый)

