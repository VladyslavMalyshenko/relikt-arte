import uuid

from typing import TypeVar

from abc import ABC, abstractmethod

from pydantic import BaseModel

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

    async def get_obj_list(self, repo: Repo) -> list[BaseModel]:
        objs = await repo.get_all()
        return [await self.get_show_scheme(obj) for obj in objs]
