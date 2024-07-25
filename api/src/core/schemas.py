from typing import TypeVar, Generic, Optional

from pydantic import BaseModel

T = TypeVar("T")


class MainSchema(BaseModel):
    class Config:
        from_attributes = True


class BaseListSchema(MainSchema, Generic[T]):
    objects_count: int
    next_page: Optional[int] = None
    previous_page: Optional[int] = None
    pages_count: int
    results: list[T]
