from sqlalchemy import and_, or_

from .base import FilterProcessor

from ....product.models import (
    Product,
    Category,
    ProductSize,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)


class ProductFilterProcessor(FilterProcessor):
    model = Product

    async def process_equals(self, field: str, value: str):
        field_attr = getattr(self.model, field)
        if field == "have_glass":
            return [
                or_(
                    and_(
                        field_attr == value,
                        self.model.category.has(is_glass_available=True),
                    ),
                    self.model.category.has(is_glass_available=False),
                )
            ]
        return [field_attr == value]


class CategoryFilterProcessor(FilterProcessor):
    model = Category


class ProductSizeFilterProcessor(FilterProcessor):
    model = ProductSize


class ProductColorFilterProcessor(FilterProcessor):
    model = ProductColor


class ProductCoveringFilterProcessor(FilterProcessor):
    model = ProductCovering


class ProductGlassColorFilterProcessor(FilterProcessor):
    model = ProductGlassColor
