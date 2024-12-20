from enum import Enum as PyEnum

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.postgresql import ENUM, JSONB

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from .enums import (
    ProductPhotoDepEnum,
    ProductOrientationEnum,
    ProductTypeOfPlatbandEnum,
)
from .utils import _default_product_description_json
from .mixins import BaseProductRelMixin


class CategorySizeAssociation(Base):
    __tablename__ = "category_size_association"

    product_size_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_size.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        primary_key=True,
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey(
            "category.id",
            ondelete="CASCADE",
            onupdate="CASCADE",
        ),
        primary_key=True,
    )


class ProductSize(BaseModelMixin, Base):
    __tablename__ = "product_size"
    __label__ = "Product size"

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
    __label__ = "Category"

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
    priority: Mapped[int] = mapped_column(
        nullable=True,
        doc="Priority",
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
    __label__ = "Product color"


class ProductCovering(BaseProductRelMixin, Base):
    instance_name = "Covering"
    __tablename__ = "product_covering"
    __label__ = "Product covering"


class ProductGlassColor(BaseProductRelMixin, Base):
    instance_name = "Glass color"
    __tablename__ = "product_glass_color"
    __label__ = "Product glass color"


class Product(BaseModelMixin, Base):
    __label__ = "Product"

    name: Mapped[str] = mapped_column(nullable=True, index=True, doc="Name")
    sku: Mapped[str] = mapped_column(nullable=True, index=True, doc="SKU")
    price: Mapped[int] = mapped_column(nullable=False, index=True, doc="Price")
    description: Mapped[dict] = mapped_column(
        JSONB,
        default=_default_product_description_json,
        doc="Description",
    )
    have_glass: Mapped[bool] = mapped_column(
        nullable=True,
        doc="Does product have glass",
    )
    material_choice: Mapped[bool] = mapped_column(
        nullable=True,
        default=False,
        doc="Is material choice available",
    )
    type_of_platband_choice: Mapped[bool] = mapped_column(
        nullable=True,
        default=False,
        doc="Is type of platband choice available",
    )
    orientation_choice: Mapped[bool] = mapped_column(
        nullable=True,
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
    photos: Mapped[list["ProductPhoto"]] = relationship(
        "ProductPhoto",
        backref="product",
        cascade="all, delete-orphan",
        doc="Photos",
    )

    def __str__(self) -> str:
        return f"Product: {self.id}. Category: {self.category.name}"


# Product photo dependencies:

# DOOR: [color, glass availability, orientation]
# BOX: [color, size]
# PLATBAND: [color, type of platband]
# EXPANDER: [color]


class ProductPhoto(BaseModelMixin, Base):
    __tablename__ = "product_photo"
    __label__ = "Product photo"

    photo: Mapped[str] = mapped_column(nullable=False, doc="Photo")
    is_main: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        doc="Is main photo",
    )
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
    with_glass: Mapped[bool] = mapped_column(
        nullable=True,
        doc="Is product photo with glass",
    )
    orientation: Mapped[PyEnum] = mapped_column(
        ENUM(
            ProductOrientationEnum,
            name="product_orientation_enum",
            create_type=True,
        ),
        nullable=True,
        doc="Orientation",
    )
    type_of_platband: Mapped[PyEnum] = mapped_column(
        ENUM(
            ProductTypeOfPlatbandEnum,
            name="product_type_of_platband_enum",
            create_type=True,
        ),
        nullable=True,
        doc="Type of platband",
    )

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
    color_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_color.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Color ID",
    )
    size_id: Mapped[int] = mapped_column(
        ForeignKey(
            "product_size.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Size ID",
    )

    def __str__(self) -> str:
        return f"Photo: {self.photo}"
