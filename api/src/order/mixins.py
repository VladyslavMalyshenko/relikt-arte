import uuid

from enum import Enum as PyEnum

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, declared_attr, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import ENUM

from ..core.db.mixins import BaseModelMixin
from ..product.models import (
    Product,
    ProductGlassColor,
    ProductCovering,
    ProductColor,
    ProductSize,
)
from ..product.enums import ProductTypeOfPlatbandEnum, ProductOrientationEnum

from .enums import ItemMaterialEnum


class ItemMixin(BaseModelMixin):
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

    material: Mapped[ItemMaterialEnum] = mapped_column(
        ENUM(
            ItemMaterialEnum,
            name="item_material_enum",
        ),
        nullable=True,
        doc="Material",
    )
    type_of_platband: Mapped[PyEnum] = mapped_column(
        ENUM(
            ProductTypeOfPlatbandEnum,
            name="product_type_of_platband_enum",
            create_type=False,
        ),
        nullable=True,
        doc="Type of platband",
    )
    orientation: Mapped[PyEnum] = mapped_column(
        ENUM(
            ProductOrientationEnum,
            name="product_orientation_enum",
            create_type=False,
        ),
        nullable=True,
        doc="Orientation",
    )
    with_glass: Mapped[bool] = mapped_column(
        nullable=True,
        doc="With glass",
    )

    quantity: Mapped[int] = mapped_column(
        nullable=False,
        default=1,
        doc="Quantity",
    )

    @declared_attr
    def product(cls) -> Mapped[Product]:
        return relationship(
            Product,
        )

    @declared_attr
    def color(cls) -> Mapped[ProductColor]:
        return relationship(
            ProductColor,
        )

    @declared_attr
    def size(cls) -> Mapped[ProductSize]:
        return relationship(
            ProductSize,
        )

    @declared_attr
    def covering(cls) -> Mapped[ProductCovering]:
        return relationship(
            ProductCovering,
        )

    @declared_attr
    def glass_color(cls) -> Mapped[ProductGlassColor]:
        return relationship(
            ProductGlassColor,
        )

    @hybrid_property
    def total_price(self):
        return self.product.price * self.quantity


class BasketAndOrderMixin(BaseModelMixin):
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=True,
        index=True,
        doc="User ID",
    )

    @hybrid_property
    def total_value(self):
        return sum(item.total_price for item in self.items)

    @hybrid_property
    def total_items(self):
        return sum(item.quantity for item in self.items)
