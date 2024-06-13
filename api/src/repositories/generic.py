from typing import Generic, TypeVar

from pydantic import BaseModel

from sqlalchemy import insert, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.db.base import Base


T = TypeVar("T", bound=Base)
CreateScheme = TypeVar("CreateScheme", bound=BaseModel)
UpdateScheme = TypeVar("UpdateScheme", bound=BaseModel)


class GenericRepository(Generic[T, CreateScheme, UpdateScheme]):
    def __init__(self, session: AsyncSession, model: type[T]) -> None:
        self.session = session
        self.model = model

    async def create(self, *, obj_in: CreateScheme) -> None:
        stmt = insert(self.model).values(**dict(obj_in))
        await self.session.execute(stmt)

    async def update(self, *, obj_in: UpdateScheme) -> None:
        stmt = update(self.model).values(**dict(obj_in))
        await self.session.execute(stmt)
