import logging

from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService
from ..repositories.product import ProductRelRepository
from ..utils.exceptions.http.base import (
    ObjectCreateException,
    ObjectUpdateException,
)
from ..utils.exceptions.uow import GetRepoByAttrNameException
from ..utils.exceptions.http.base import IdNotFoundException

from .models import ProductSize, Category
from .schemas import (
    CategoryCreate,
    CategoryUpdate,
    CategoryShow,
    ProductSizeCreate,
    ProductSizeUpdate,
    ProductSizeShow,
    ProductRelCreate,
    ProductRelUpdate,
    ProductRelShow,
)
from .enums import ProductRelModelEnum


log = logging.getLogger(__name__)


class ProductService(BaseService):
    pass


class CategoryService(BaseService):
    async def get_show_scheme(self, obj) -> CategoryShow:
        return CategoryShow(
            id=obj.id,
            name=obj.name,
            is_glass_available=obj.is_glass_available,
            have_material_choice=obj.have_material_choice,
            have_orientation_choice=obj.have_orientation_choice,
            have_type_of_platband_choice=obj.have_type_of_platband_choice,
            allowed_sizes=[size.id for size in obj.allowed_sizes],
        )

    async def create_category(self, data: CategoryCreate) -> CategoryShow:
        try:
            async with self.uow:
                sizes = await self.uow.product_size.get_by_ids(
                    obj_ids=data.allowed_sizes
                )
                category = await self.uow.category.create(
                    obj_in=data, allowed_sizes=sizes
                )
                await self.uow.add(category)
                await self.uow.commit()
                return await self.get_show_scheme(category)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException("Category")

    async def update_category(
        self, data: CategoryUpdate, category_id: int
    ) -> CategoryShow:
        try:
            async with self.uow:
                category_obj = (
                    await self.uow.category.get_by_id_with_allowed_sizes(
                        obj_id=category_id
                    )
                )
                if not category_obj:
                    raise IdNotFoundException(
                        self.uow.category.model, category_id
                    )
                if data.allowed_sizes:
                    allowed_sizes = await self.uow.product_size.get_by_ids(
                        obj_ids=data.allowed_sizes
                    )
                else:
                    allowed_sizes = None
                category = await self.uow.category.update(
                    obj_in=data,
                    category=category_obj,
                    allowed_sizes=allowed_sizes,
                )
                await self.uow.add(category)
                await self.uow.commit()
                return await self.get_show_scheme(category)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("Category")

    async def delete_category(self, category_id: int) -> None:
        try:
            async with self.uow:
                await self.uow.category.delete_by_id(obj_id=category_id)
                await self.uow.commit()
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("Category")

    async def get_category_obj(self, category_id: int) -> CategoryShow:
        try:
            async with self.uow:
                category = (
                    await self.uow.category.get_by_id_with_allowed_sizes(
                        obj_id=category_id
                    )
                )
                if not category:
                    raise IdNotFoundException(
                        self.uow.category.model, category_id
                    )
                return await self.get_show_scheme(category)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("Category")

    async def get_category_list(self) -> list[CategoryShow]:
        try:
            async with self.uow:
                return [
                    await self.get_show_scheme(category)
                    for category in await self.uow.category.get_all_with_allowed_sizes()
                ]
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("Category")


class ProductSizeService(BaseService):
    async def get_show_scheme(self, obj) -> ProductSizeShow:
        return ProductSizeShow(
            id=obj.id,
            height=obj.height,
            width=obj.width,
            thickness=obj.thickness,
            dimensions=obj.dimensions,
        )

    async def create_product_size(
        self, data: ProductSizeCreate
    ) -> ProductSizeShow:
        try:
            async with self.uow:
                return await self.create_obj(self.uow.product_size, data)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException("ProductSize")

    async def update_product_size(
        self,
        data: ProductSizeUpdate,
        product_size_id: int,
    ) -> ProductSizeShow:
        try:
            async with self.uow:
                return await self.update_obj(
                    self.uow.product_size, data, product_size_id
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")

    async def delete_product_size(self, product_size_id: int) -> None:
        try:
            async with self.uow:
                await self.uow.product_size.delete_by_id(
                    obj_id=product_size_id
                )
                await self.uow.commit()
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")

    async def get_product_size_obj(
        self, product_size_id: int
    ) -> ProductSizeShow:
        try:
            async with self.uow:
                return await self.get_obj(
                    self.uow.product_size, product_size_id
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")

    async def get_product_size_list(self) -> list[ProductSizeShow]:
        try:
            async with self.uow:
                return await self.get_obj_list(self.uow.product_size)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")


class ProductRelService(BaseService):
    async def get_show_scheme(self, obj) -> BaseModel:
        return ProductRelShow(
            id=obj.id,
            name=obj.name,
            active=obj.active,
        )

    async def get_repo(
        self, rel_model: ProductRelModelEnum
    ) -> ProductRelRepository:
        if not hasattr(self.uow, rel_model.value):
            raise GetRepoByAttrNameException(label=rel_model.value)
        return getattr(self.uow, rel_model.value)

    async def create_product_rel(
        self, data: ProductRelCreate, rel_model: ProductRelModelEnum
    ) -> ProductRelShow:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                return await self.create_obj(repo, data)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException(rel_model)

    async def update_product_rel(
        self,
        data: ProductRelUpdate,
        rel_obj_id: int,
        rel_model: ProductRelModelEnum,
    ) -> ProductRelShow:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                return await self.update_obj(repo, data, rel_obj_id)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)

    async def delete_product_rel(
        self, rel_obj_id: int, rel_model: ProductRelModelEnum
    ) -> None:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                await repo.delete_by_id(obj_id=rel_obj_id)
                await self.uow.commit()
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)

    async def get_product_rel_obj(
        self, rel_obj_id: int, rel_model: ProductRelModelEnum
    ) -> ProductRelShow:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                return await self.get_obj(repo, rel_obj_id)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)

    async def get_product_rel_list(
        self, rel_model: ProductRelModelEnum
    ) -> list[ProductRelShow]:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                return await self.get_obj_list(repo)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)
