from typing import TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..product.models import ProductColor, ProductCovering, ProductGlassColor
from ..product.schemas import (
    ProductRelCreate,
    ProductRelUpdate,
)

ProductRel = TypeVar(
    "ProductRel",
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)


class ProductRelRepository(
    GenericRepository[ProductRel, ProductRelCreate, ProductRelUpdate]
):
    model_class = None

    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, self.model_class)


class ProductColorRepository(ProductRelRepository[ProductColor]):
    model_class = ProductColor


class ProductCoveringRepository(ProductRelRepository[ProductCovering]):
    model_class = ProductCovering


class ProductGlassColorRepository(ProductRelRepository[ProductGlassColor]):
    model_class = ProductGlassColor
