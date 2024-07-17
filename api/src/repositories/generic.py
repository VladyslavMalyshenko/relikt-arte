import uuid

from typing import Generic, TypeVar, Optional

from pydantic import BaseModel

from sqlalchemy import select, insert, update, delete, exists
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.db.base import Base
from ..utils.base import clean_dict


T = TypeVar("T", bound=Base)
CreateScheme = TypeVar("CreateScheme", bound=BaseModel)
UpdateScheme = TypeVar("UpdateScheme", bound=BaseModel)


class GenericRepository(Generic[T, CreateScheme, UpdateScheme]):
    def __init__(self, session: AsyncSession, model: type[T]) -> None:
        self.session = session
        self.model = model

    async def _add_options_to_query(self, query, options: list) -> None:
        for option in options:
            query = query.options(option)
        return query

    async def _add_filters_to_query(self, query, filters: list) -> None:
        for filter in filters:
            query = query.filter(filter)
        return query

    async def create(
        self,
        *,
        obj_in: CreateScheme,
        clean_dict_ignore_keys: Optional[list] = None,
        **kwargs,
    ) -> int | uuid.UUID:
        stmt = (
            insert(self.model)
            .values(
                **clean_dict(
                    dict(obj_in),
                    ignore_keys=clean_dict_ignore_keys,
                )
            )
            .returning(self.model.id)
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def update(
        self,
        *,
        obj_in: UpdateScheme,
        obj_id: int | uuid.UUID,
        clean_dict_ignore_keys: Optional[list] = None,
        **kwargs,
    ) -> int | uuid.UUID:
        stmt = (
            update(self.model)
            .where(self.model.id == obj_id)
            .values(
                **clean_dict(
                    dict(obj_in),
                    ignore_keys=clean_dict_ignore_keys,
                )
            )
            .returning(self.model.id)
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def get_by_id(
        self,
        *,
        obj_id: int | uuid.UUID,
        options: Optional[list] = None,
    ) -> T:
        query = select(self.model).where(self.model.id == obj_id)
        if options:
            query = await self._add_options_to_query(query, options)
        res = await self.session.execute(query)
        return res.scalar()

    async def get_by_ids(
        self,
        *,
        obj_ids: list[int | uuid.UUID],
        options: Optional[list] = None,
    ) -> list[T]:
        query = select(self.model).where(self.model.id.in_(obj_ids))
        if options:
            query = await self._add_options_to_query(query, options)
        res = await self.session.execute(query)
        return res.scalars().all()

    async def get_all(
        self,
        options: Optional[list] = None,
        filters: Optional[list] = None,
    ) -> list[T]:
        query = select(self.model)
        if options:
            query = await self._add_options_to_query(query, options)
        if filters:
            query = await self._add_filters_to_query(query, filters)
        res = await self.session.execute(query)
        return res.scalars().all()

    async def exists_by_id(self, *, obj_id: int | uuid.UUID) -> bool:
        query = exists().where(self.model.id == obj_id).select()
        res = await self.session.execute(query)
        return res.scalar_one()

    async def delete_by_id(self, *, obj_id: int | uuid.UUID) -> None:
        stmt = delete(self.model).where(self.model.id == obj_id)
        await self.session.execute(stmt)
