from typing import Optional

from pydantic import BaseModel

from ..core.schemas import MainSchema


class ProductSizeCreate(BaseModel):
    height: int
    width: int
    thickness: int


class ProductSizeUpdate(BaseModel):
    height: Optional[int] = None
    width: Optional[int] = None
    thickness: Optional[int] = None


class ProductSizeShow(MainSchema):
    id: int
    height: int
    width: int
    thickness: int
    dimensions: str


class ProductRelCreate(BaseModel):
    name: str


class ProductRelUpdate(BaseModel):
    name: Optional[str] = None
    active: Optional[bool] = None


class ProductRelShow(MainSchema):
    id: int
    name: str
    active: bool
