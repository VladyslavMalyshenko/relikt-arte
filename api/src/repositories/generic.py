import uuid

from typing import Generic, TypeVar

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

    async def create(self, *, obj_in: CreateScheme) -> int | uuid.UUID:
        stmt = (
            insert(self.model)
            .values(**clean_dict(dict(obj_in)))
            .returning(self.model.id)
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def update(self, *, obj_in: UpdateScheme) -> int | uuid.UUID:
        stmt = (
            update(self.model)
            .values(**clean_dict(dict(obj_in)))
            .returning(self.model.id)
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def get_by_id(self, *, obj_id: int | uuid.UUID) -> T:
        query = select(self.model).where(self.model.id == obj_id)
        res = await self.session.execute(query)
        return res.scalar()

    async def get_all(self) -> list[T]:
        query = select(self.model)
        res = await self.session.execute(query)
        return res.scalars().all()

    async def exists_by_id(self, *, obj_id: int | uuid.UUID) -> bool:
        query = exists().where(self.model.id == obj_id).select()
        res = await self.session.execute(query)
        return res.scalar_one()

    async def delete_by_id(self, *, obj_id: int | uuid.UUID) -> None:
        stmt = delete(self.model).where(self.model.id == obj_id)
        await self.session.execute(stmt)
