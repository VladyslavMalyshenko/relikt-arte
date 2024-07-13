import logging

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService
from ..repositories.product import ProductRelRepository
from ..utils.exceptions.http.base import (
    ObjectCreateException,
    ObjectUpdateException,
)
from ..utils.exceptions.uow import GetRepoByAttrNameException
from ..utils.exceptions.http.base import IdNotFoundException

from .models import ProductSize
from .schemas import (
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


class ProductSizeService(BaseService):
    async def create_product_size(
        self, data: ProductSizeCreate
    ) -> ProductSizeShow:
        try:
            async with self.uow:
                product_size_id = await self.uow.product_size.create(
                    obj_in=data
                )
                await self.uow.commit()
                product_size = await self.uow.product_size.get_by_id(
                    obj_id=product_size_id
                )
                return ProductSizeShow(
                    id=product_size.id,
                    height=product_size.height,
                    width=product_size.width,
                    thickness=product_size.thickness,
                    dimensions=product_size.dimensions,
                )
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
                if not await self.uow.product_size.exists_by_id(
                    obj_id=product_size_id
                ):
                    raise IdNotFoundException(
                        model=ProductSize,
                        id=product_size_id,
                    )
                await self.uow.product_size.update(obj_in=data)
                await self.uow.commit()
                product_size = await self.uow.product_size.get_by_id(
                    obj_id=product_size_id
                )
                return ProductSizeShow(
                    id=product_size.id,
                    height=product_size.height,
                    width=product_size.width,
                    thickness=product_size.thickness,
                    dimensions=product_size.dimensions,
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
                product_size = await self.uow.product_size.get_by_id(
                    obj_id=product_size_id
                )
                if not product_size:
                    raise IdNotFoundException(
                        model=ProductSize,
                        id=product_size_id,
                    )
                return ProductSizeShow(
                    id=product_size.id,
                    height=product_size.height,
                    width=product_size.width,
                    thickness=product_size.thickness,
                    dimensions=product_size.dimensions,
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")

    async def get_product_size_list(self) -> list[ProductSizeShow]:
        try:
            async with self.uow:
                product_sizes = await self.uow.product_size.get_all()
                return [
                    ProductSizeShow(
                        id=product_size.id,
                        height=product_size.height,
                        width=product_size.width,
                        thickness=product_size.thickness,
                        dimensions=product_size.dimensions,
                    )
                    for product_size in product_sizes
                ]
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException("ProductSize")


class ProductRelService(BaseService):
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
                rel_obj_id = await repo.create(obj_in=data)
                await self.uow.commit()
                rel_obj = await repo.get_by_id(obj_id=rel_obj_id)
                return ProductRelShow(
                    id=rel_obj.id,
                    name=rel_obj.name,
                    active=rel_obj.active,
                )
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
                if not await repo.exists_by_id(obj_id=rel_obj_id):
                    raise IdNotFoundException(
                        id=rel_obj_id,
                        model_name=rel_model.get_name().capitalize(),
                    )
                await repo.update(obj_in=data)
                await self.uow.commit()
                rel_obj = await repo.get_by_id(obj_id=rel_obj_id)
                return ProductRelShow(
                    id=rel_obj.id,
                    name=rel_obj.name,
                    active=rel_obj.active,
                )
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
                rel_obj = await repo.get_by_id(obj_id=rel_obj_id)
                if not rel_obj:
                    raise IdNotFoundException(
                        id=rel_obj_id,
                        model=rel_obj,
                    )
                return ProductRelShow(
                    id=rel_obj.id,
                    name=rel_obj.name,
                    active=rel_obj.active,
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)

    async def get_product_rel_list(
        self, rel_model: ProductRelModelEnum
    ) -> list[ProductRelShow]:
        try:
            async with self.uow:
                repo = await self.get_repo(rel_model)
                rel_objs = await repo.get_all()
                print(rel_objs)
                return [
                    ProductRelShow(
                        id=rel_obj.id,
                        name=rel_obj.name,
                        active=rel_obj.active,
                    )
                    for rel_obj in rel_objs
                ]
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectUpdateException(rel_model)
