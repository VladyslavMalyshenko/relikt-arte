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
    async def create_product_rel(self, *, obj_in: ProductRelCreate) -> None:
        await self.create(obj_in=obj_in)

    async def update_product_rel(self, *, obj_in: ProductRelUpdate) -> None:
        await self.update(obj_in=obj_in)


class ProductCategoryRepository(ProductRelRepository[ProductCategory]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductCategory)


class ProductColorRepository(ProductRelRepository[ProductColor]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductColor)


class ProductCoveringRepository(ProductRelRepository[ProductCovering]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductCovering)


class ProductGlassColorRepository(ProductRelRepository[ProductGlassColor]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductGlassColor)
