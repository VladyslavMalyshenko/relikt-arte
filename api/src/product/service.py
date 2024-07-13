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

from .schemas import ProductRelCreate, ProductRelUpdate, ProductRelShow
from .enums import ProductRelModelEnum


log = logging.getLogger(__name__)


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
                print(f"REL OBJ ID: {rel_obj_id}")
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
