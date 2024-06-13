import logging

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService
from ..utils.exceptions.http.base import ObjectCreateException
from ..utils.exceptions.uow import GetRepoByAttrNameException

from .schemas import ProductRelCreate
from .enums import ProductRelModel


log = logging.getLogger(__name__)


class ProductService(BaseService):
    pass


class ProductRelService(BaseService):
    async def create_product_rel(
        self, data: ProductRelCreate, rel_model: ProductRelModel
    ):
        try:
            async with self.uow:
                if not hasattr(self.uow, rel_model.value):
                    raise GetRepoByAttrNameException(label=rel_model.value)
                repo = getattr(self.uow, rel_model.value)
                await repo.create_product_rel(obj_in=data)
                await self.uow.commit()
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException(object_name=rel_model)
