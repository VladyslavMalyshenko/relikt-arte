import uuid

from typing import TypeVar, Optional

from abc import ABC, abstractmethod

from pydantic import BaseModel

from ...core.dependencies import PaginationParams
from ...core.schemas import BaseListSchema

from .dependencies import uowDEP
from ...utils.processors.filters.dependencies import FiltersDecoder
from ...utils.processors.filters.base import FilterProcessor
from ...utils.exceptions.processors.filters import FilterException
from ...utils.exceptions.http.filters import FilterProcessException
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
    filter_processor: FilterProcessor
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
        clean_dict_ignore_keys: Optional[list] = None,
    ) -> BaseModel:
        if not await repo.exists_by_id(obj_id=obj_id):
            raise IdNotFoundException(model=repo.model, id=obj_id)
        await repo.update(
            obj_in=data,
            obj_id=obj_id,
            clean_dict_ignore_keys=clean_dict_ignore_keys,
        )
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
        options: Optional[list] = None,
        filters: Optional[list] = None,
        pagination_params: Optional[PaginationParams] = None,
        filters_decoder: Optional[FiltersDecoder] = None,
    ) -> BaseListSchema[BaseModel] | list[BaseModel]:
        try:
            if filters_decoder and filters_decoder.decoded_filters:
                decoded_filters = (
                    await self.filter_processor().process_filters(
                        filters_decoder.decoded_filters,
                    )
                )
                if filters:
                    filters.extend(decoded_filters)
                else:
                    filters = decoded_filters
        except FilterException:
            raise FilterProcessException()

        if pagination_params and pagination_params.page:
            paginated = True
            objs = await repo.get_all(
                with_pagination=True,
                options=options,
                filters=filters,
                pagination=pagination_params,
            )
        else:
            paginated = False
            objs = await repo.get_all(
                options=options,
                filters=filters,
            )

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
