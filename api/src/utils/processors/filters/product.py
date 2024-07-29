from .base import FilterProcessor

from ....product.models import (
    Product,
    Category,
    ProductSize,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)
from ....product.enums import ProductRelModelEnum


class ProductFilterProcessor(FilterProcessor):
    model = Product


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
