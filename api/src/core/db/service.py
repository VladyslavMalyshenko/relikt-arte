import uuid

from typing import TypeVar, Optional

from abc import ABC, abstractmethod

from pydantic import BaseModel

from ...core.dependencies import PaginationParams
from ...core.schemas import BaseListSchema

from .dependencies import uowDEP
from ...utils.exceptions.http.base import IdNotFoundException


Repo = TypeVar("Repo")


class AbstractService(ABC):
    @abstractmethod
    async def get_show_scheme(self, obj) -> BaseModel:
        raise NotImplementedError()

    @abstractmethod
    async def create_obj(self, repo: Repo, data: BaseModel) -> BaseModel:
        raise NotImplementedError()

    @abstractmethod
    async def update_obj(
        self,
        repo: Repo,
        data: BaseModel,
        obj_id: int | uuid.UUID,
    ) -> BaseModel:
        raise NotImplementedError()


class BaseService(AbstractService):
    list_schema: Optional[BaseListSchema] = None

    def __init__(self, uow: uowDEP) -> None:
        self.uow = uow

    async def create_obj(self, repo: Repo, data: BaseModel) -> BaseModel:
        obj_id = await repo.create(obj_in=data)
        await self.uow.commit()
        obj = await repo.get_by_id(obj_id=obj_id)
        return await self.get_show_scheme(obj)

    async def update_obj(
        self,
        repo: Repo,
        data: BaseModel,
        obj_id: int | uuid.UUID,
    ) -> BaseModel:
        if not await repo.exists_by_id(obj_id=obj_id):
            raise IdNotFoundException(model=repo.model, id=obj_id)
        await repo.update(obj_in=data, obj_id=obj_id)
        await self.uow.commit()
        obj = await repo.get_by_id(obj_id=obj_id)
        return await self.get_show_scheme(obj)

    async def get_obj(self, repo: Repo, obj_id: int | uuid.UUID) -> BaseModel:
        obj = await repo.get_by_id(obj_id=obj_id)
        if not obj:
            raise IdNotFoundException(model=repo.model, id=obj_id)
        return await self.get_show_scheme(obj)

    async def get_obj_list(
        self,
        repo: Repo,
        pagination_params: Optional[PaginationParams] = None,
    ) -> BaseListSchema[BaseModel] | list[BaseModel]:
        if pagination_params and pagination_params.page:
            paginated = True
            objs = await repo.get_all(
                with_pagination=True,
                pagination=pagination_params,
            )
        else:
            paginated = False
            objs = await repo.get_all()

        objs_list = [await self.get_show_scheme(obj) for obj in objs]

        if paginated:
            objs_total_count = await repo.get_count()
            total_pages = (
                objs_total_count + pagination_params.size - 1
            ) // pagination_params.size
            next_page = (
                pagination_params.page + 1
                if pagination_params.page < total_pages
                else None
            )
            previous_page = (
                pagination_params.page - 1
                if pagination_params.page > 1
                else None
            )
            return self.list_schema(
                objects_count=objs_total_count,
                next_page=next_page,
                previous_page=previous_page,
                pages_count=total_pages,
                results=objs_list,
            )
        return objs_list
