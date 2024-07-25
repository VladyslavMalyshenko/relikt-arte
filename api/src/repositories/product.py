from typing import TypeVar, Iterable, Optional

from uuid import UUID

from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.dependencies import PaginationParams

from .generic import GenericRepository

from ..product.models import (
    Product,
    ProductPhoto,
    Category,
    ProductSize,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
)
from ..product.schemas import (
    ProductCreate,
    ProductUpdate,
    ProductPhotoCreate,
    ProductPhotoUpdate,
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


class ProductRepository(
    GenericRepository[Product, ProductCreate, ProductUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Product)

    async def _add_default_options(self, options: list | None) -> list:
        photos_options = selectinload(self.model.photos)
        if not options:
            options = [photos_options]
        else:
            options.append(photos_options)
        return options

    async def create(self, *, obj_in: dict) -> int | UUID:
        return await super().create(
            obj_in=obj_in,
            clean_dict_ignore_keys=(
                ["description"]
                if obj_in.get("description") is not None
                else []
            ),
        )

    async def update(self, *, obj_in: dict, obj_id: int | UUID) -> int | UUID:
        return await super().update(
            obj_in=obj_in,
            obj_id=obj_id,
            clean_dict_ignore_keys=(
                ["description"]
                if obj_in.get("description") is not None
                else []
            ),
        )

    async def get_all(
        self,
        options: list | None = None,
        filters: list | None = None,
        with_pagination: bool = False,
        pagination: Optional[PaginationParams] = None,
    ) -> list[Product]:
        options = await self._add_default_options(options)
        return await super().get_all(
            options=options,
            filters=filters,
            with_pagination=with_pagination,
            pagination=pagination,
        )

    async def get_by_id(
        self,
        *,
        obj_id: int | UUID,
        options: list | None = None,
    ) -> Product:
        options = await self._add_default_options(options)
        return await super().get_by_id(obj_id=obj_id, options=options)

    async def get_by_ids(
        self,
        *,
        obj_ids: list[int | UUID],
        options: list | None = None,
        with_pagination=False,
        pagination: Optional[PaginationParams] = None,
    ) -> list[Product]:
        options = await self._add_default_options(options)
        return await super().get_by_ids(
            obj_ids=obj_ids,
            options=options,
            with_pagination=with_pagination,
            pagination=pagination,
        )

    async def get_all_by_category(
        self,
        category_id: int,
        with_pagination=False,
        pagination: Optional[PaginationParams] = None,
    ) -> list[Product]:
        return await self.get_all(
            filters=[self.model.category_id == category_id],
            with_pagination=with_pagination,
            pagination=pagination,
        )


class ProductPhotoRepository(
    GenericRepository[ProductPhoto, ProductPhotoCreate, ProductPhotoUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProductPhoto)

    async def bulk_product_photo_save(
        self, photos: list[ProductPhotoCreate]
    ) -> list[ProductPhoto]:
        instance_list = []
        photos_data = [clean_dict(dict(photo)) for photo in photos]

        for photo_data in photos_data:
            instance_list.append(ProductPhoto(**photo_data))
        return instance_list


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

    async def get_all(
        self,
        options: list | None = None,
        filters: list | None = None,
        with_pagination: bool = False,
        pagination: Optional[PaginationParams] = None,
    ) -> list[ProductRel]:
        return await super().get_all(
            options,
            filters,
            with_pagination,
            pagination,
        )


class ProductColorRepository(ProductRelRepository[ProductColor]):
    model_class = ProductColor


class ProductCoveringRepository(ProductRelRepository[ProductCovering]):
    model_class = ProductCovering


class ProductGlassColorRepository(ProductRelRepository[ProductGlassColor]):
    model_class = ProductGlassColor
