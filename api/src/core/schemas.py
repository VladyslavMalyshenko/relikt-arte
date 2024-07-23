from typing import TypeVar, Generic

from pydantic import BaseModel

T = TypeVar("T")


class MainSchema(BaseModel):
    class Config:
        from_attributes = True


class BaseListSchema(MainSchema, Generic[T]):
    objects_count: int
    next: str
    previous: str
    pages_count: int
    results: list[T]
