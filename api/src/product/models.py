from enum import Enum as PyEnum

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import ENUM, JSONB

from .mixins import BaseProductRelMixin
from .enums import ProductOrientation
from .utils import _default_product_description_json

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin


class ProductCategory(BaseProductRelMixin, Base):
    instance_name = "Category"
    __tablename__ = "product_category"
    __label__ = "product_category"


class ProductColor(BaseProductRelMixin, Base):
    instance_name = "Color"
    __tablename__ = "product_color"
    __label__ = "product_color"


class ProductCovering(BaseProductRelMixin, Base):
    instance_name = "Covering"
    __tablename__ = "product_covering"
    __label__ = "product_covering"


class ProductGlassColor(BaseProductRelMixin, Base):
    instance_name = "Glass color"
    __tablename__ = "product_glass_color"
    __label__ = "product_glass_color"


class ProductSize(BaseModelMixin, Base):
    __tablename__ = "product_size"
    __label__ = "product_size"

    height: Mapped[int] = mapped_column(
        nullable=False, index=True, doc="Height"
    )
    width: Mapped[int] = mapped_column(nullable=False, index=True, doc="Width")
    thickness: Mapped[int] = mapped_column(
        nullable=False, index=True, doc="Thickness"
    )

    @hybrid_property
    async def dimensions(self) -> str:
        return f"{self.height}x{self.width}x{self.thickness}"

    def __str__(self) -> str:
        return f"Size: {self.dimensions}"


class Product(BaseModelMixin, Base):
    __label__ = "product"

    name: Mapped[str] = mapped_column(nullable=False, index=True, doc="Name")
    price: Mapped[int] = mapped_column(nullable=False, index=True, doc="Price")
    orientation: Mapped[PyEnum] = mapped_column(
        ENUM(ProductOrientation, name="product_orientation"),
        nullable=True,
        index=True,
        doc="Orientation",
    )
    have_glass: Mapped[bool] = mapped_column(
        nullable=False, index=True, default=False, doc="Have glass"
    )
    description: Mapped[dict] = mapped_column(
        JSONB,
        default=text(f"{_default_product_description_json()}"),
        doc="Description",
    )
    photo: Mapped[str] = mapped_column(
        nullable=False,
        info={"directory": "products"},
        doc="Photo",
    )

    category_id = mapped_column(
        ForeignKey(
            "product_category.id",
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Category ID",
    )
    color_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_color.id",
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Color ID",
    )
    covering_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_covering.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Covering ID",
    )
    glass_color_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_glass_color.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Glass color ID",
    )

    category: Mapped[ProductCategory] = relationship(doc="Category")
    color: Mapped[ProductColor] = relationship(doc="Color")
    covering: Mapped[ProductCovering | None] = relationship(doc="Covering")
    glass_color: Mapped[ProductGlassColor | None] = relationship(
        doc="Glass color"
    )

    def __str__(self) -> str:
        return f"Product: {self.name}. Category: {self.category.name}"
