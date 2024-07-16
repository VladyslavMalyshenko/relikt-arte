from typing import TypeVar, Iterable, Optional

from uuid import UUID

from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..product.models import (
    Category,
    ProductSize,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)
from ..product.schemas import (
    CategoryCreate,
    CategoryUpdate,
    ProductSizeCreate,
    ProductSizeUpdate,
    ProductRelCreate,
    ProductRelUpdate,
)

from ..utils.base import clean_dict

ProductRel = TypeVar(
    "ProductRel",
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)


class CategoryRepository(
    GenericRepository[Category, CategoryCreate, CategoryUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Category)

    async def get_all_with_allowed_sizes(self) -> list[Category]:
        return await self.get_all(
            options=[
                selectinload(self.model.allowed_sizes),
            ]
        )

    async def get_by_id_with_allowed_sizes(self, obj_id: int) -> Category:
        return await self.get_by_id(
            obj_id=obj_id,
            options=[joinedload(self.model.allowed_sizes)],
        )

    async def create(
        self,
        *,
        obj_in: CategoryCreate,
        allowed_sizes: Iterable,
    ) -> int | UUID:
        category = Category(
            name=obj_in.name,
            is_glass_available=obj_in.is_glass_available,
            have_material_choice=obj_in.have_material_choice,
            have_orientation_choice=obj_in.have_orientation_choice,
            have_type_of_platband_choice=obj_in.have_type_of_platband_choice,
        )
        category.allowed_sizes = allowed_sizes
        return category

    async def update(
        self,
        *,
        obj_in: CategoryUpdate,
        category: Category,
        allowed_sizes: Optional[Iterable] = None,
    ) -> Category:
        data = clean_dict(dict(obj_in))
        for key, value in data.items():
            if key != "allowed_sizes":
                setattr(category, key, value)
        if allowed_sizes is not None:
            category.allowed_sizes = allowed_sizes
        return category


class ProductSizeRepository(
    GenericRepository[ProductSize, ProductSizeCreate, ProductSizeUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductSize)


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
