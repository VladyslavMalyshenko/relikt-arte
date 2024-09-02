from typing import TypeVar, Generic, Optional

from pydantic import BaseModel

T = TypeVar("T")


class MainSchema(BaseModel):
    class Config:
        from_attributes = True


class BaseListSchema(MainSchema, Generic[T]):
    objects_count: Optional[int] = None
    next_page: Optional[int] = None
    previous_page: Optional[int] = None
    pages_count: Optional[int] = None
    results: Optional[list[T]] = None
