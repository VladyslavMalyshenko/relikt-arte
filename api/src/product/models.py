from enum import Enum as PyEnum

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import ENUM, JSONB

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from .enums import ProductPhotoDepEnum
from .utils import _default_product_description_json
from .mixins import BaseProductRelMixin


class CategorySizeAssociation(Base):
    __tablename__ = "category_size_association"

    product_size_id: Mapped[int] = mapped_column(
        ForeignKey("product_size.id"), primary_key=True
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("category.id"), primary_key=True
    )


class ProductSize(BaseModelMixin, Base):
    __tablename__ = "product_size"

    height: Mapped[int] = mapped_column(
        nullable=False, index=True, doc="Height"
    )
    width: Mapped[int] = mapped_column(nullable=False, index=True, doc="Width")
    thickness: Mapped[int] = mapped_column(
        nullable=False, index=True, doc="Thickness"
    )

    @hybrid_property
    def dimensions(self) -> str:
        return f"{self.height}x{self.width}x{self.thickness}"

    def __str__(self) -> str:
        return f"Size: {self.dimensions}"


class Category(BaseModelMixin, Base):
    name: Mapped[str] = mapped_column(nullable=False, index=True, doc="Name")
    is_glass_available: Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
        doc="Is glass available for products in this category",
    )
    have_material_choice: Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
        doc="Is material choice available for products in this category",
    )
    have_orientation_choice: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        doc="Is orientation choice available for products in this category",
    )
    have_type_of_platband_choice: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        doc="Is type of platband choice available for products in this category",
    )

    allowed_sizes: Mapped[list[ProductSize]] = relationship(
        secondary="category_size_association",
        doc="Allowed sizes for this category",
    )

    def __str__(self) -> str:
        return f"Category: {self.name}"


class ProductColor(BaseProductRelMixin, Base):
    instance_name = "Color"
    __tablename__ = "product_color"
    __label__ = "product_color"


class ProductCovering(BaseProductRelMixin, Base):
    instance_name = "Covering"
    __tablename__ = "product_covering"


class ProductGlassColor(BaseProductRelMixin, Base):
    instance_name = "Glass color"
    __tablename__ = "product_glass_color"


class Product(BaseModelMixin, Base):
    price: Mapped[int] = mapped_column(nullable=False, index=True, doc="Price")
    description: Mapped[dict] = mapped_column(
        JSONB,
        default=_default_product_description_json,
        doc="Description",
    )
    have_glass: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        doc="Does product have glass",
    )
    orientation_choice: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        doc="Is orientation choice available",
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey(
            "category.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Category",
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

    category: Mapped[Category] = relationship(doc="Category")
    covering: Mapped[ProductCovering | None] = relationship(doc="Covering")

    def __str__(self) -> str:
        return f"Product: {self.id}. Category: {self.category.name}"


# Product photo dependencies:

# DOOR: [color, glass availability, orientation]
# BOX: [color, size]
# PLATBAND: [color, type of platband]
# EXPANDER: [color]


class ProductPhoto(BaseModelMixin, Base):
    __tablename__ = "product_photo"

    product_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        nullable=False,
        index=True,
        doc="Product ID",
    )
    photo: Mapped[str] = mapped_column(nullable=False, doc="Photo")
    dependency: Mapped[PyEnum] = mapped_column(
        ENUM(
            ProductPhotoDepEnum,
            name="product_photo_dep_enum",
            create_type=False,
        ),
        nullable=False,
        default=ProductPhotoDepEnum.COLOR,
        doc="Dependency",
    )

    def __str__(self) -> str:
        return f"Photo: {self.photo}"
