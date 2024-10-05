import datetime

from enum import Enum as PyEnum

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ENUM

from ..core.db.base import Base

from .mixins import ItemMixin, BasketAndOrderMixin
from .enums import OrderStatusEnum


class Basket(BasketAndOrderMixin, Base):
    basket_token: Mapped[str] = mapped_column(
        nullable=True,
        index=True,
        doc="Basket token",
    )
    items: Mapped[list["BasketItem"]] = relationship(
        backref="basket",
        cascade="all, delete-orphan",
    )

    def clear(self) -> None:
        self.items.clear()

    def __str__(self) -> str:
        return f"Basket {self.id}. Total items: {self.total_items}. Total value: {self.total_value}"


class BasketItem(ItemMixin, Base):
    __tablename__ = "basket_item"

    basket_id: Mapped[int] = mapped_column(
        ForeignKey(
            "basket.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Basket ID",
    )

    def __str__(self) -> str:
        return f"{self.product.sku} - {self.quantity} шт."


class Order(BasketAndOrderMixin, Base):
    full_name: Mapped[str] = mapped_column(
        nullable=False,
        doc="Full name",
    )
    phone: Mapped[str] = mapped_column(
        nullable=False,
        doc="Phone",
    )
    email: Mapped[str] = mapped_column(
        nullable=False,
        doc="Email",
    )
    region: Mapped[str] = mapped_column(
        nullable=False,
        doc="Region",
    )
    city_or_settlement: Mapped[str] = mapped_column(
        nullable=False,
        doc="City or settlement",
    )
    warehouse: Mapped[str] = mapped_column(
        nullable=True,
        doc="Warehouse",
    )
    delivery_address: Mapped[str] = mapped_column(
        nullable=True,
        doc="Delivery address",
    )
    additional_info: Mapped[str] = mapped_column(
        nullable=True,
        doc="Additional info",
    )
    status: Mapped[PyEnum] = mapped_column(
        ENUM(
            OrderStatusEnum,
            name="order_status_enum",
            create_type=True,
        ),
        default=OrderStatusEnum.NEW,
        nullable=False,
        doc="Order status",
    )
    status_date_to: Mapped[datetime.date] = mapped_column(
        nullable=True,
        doc="Date to change status",
    )

    items: Mapped[list["OrderItem"]] = relationship(
        backref="order",
        cascade="all, delete-orphan",
    )

    def __str__(self) -> str:
        return f"Order {self.id}"


class OrderItem(ItemMixin, Base):
    __tablename__ = "order_item"

    order_id: Mapped[int] = mapped_column(
        ForeignKey(
            "order.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Order ID",
    )

    def __str__(self) -> str:
        return f"{self.product.sku} - {self.quantity} шт."
