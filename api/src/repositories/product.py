from typing import TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..product.models import (
    Product,
    ProductCategory,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
    ProductSize,
)
from ..product.schemas import (
    ProductCreate,
    ProductUpdate,
    ProductRelCreate,
    ProductRelUpdate,
)


ProductRel = TypeVar(
    "ProductRel",
    ProductCategory,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)


class ProductRepository(
    GenericRepository[Product, ProductCreate, ProductUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Product)


class ProductRelRepository(
    GenericRepository[ProductRel, ProductRelCreate, ProductRelUpdate]
):
    model_class = None

    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, self.model_class)


class ProductCategoryRepository(ProductRelRepository[ProductCategory]):
    model_class = ProductCategory


class ProductColorRepository(ProductRelRepository[ProductColor]):
    model_class = ProductColor


class ProductCoveringRepository(ProductRelRepository[ProductCovering]):
    model_class = ProductCovering


class ProductGlassColorRepository(ProductRelRepository[ProductGlassColor]):
    model_class = ProductGlassColor
