from typing import Optional

from pydantic import BaseModel

from ..core.schemas import MainSchema


class CategoryCreate(BaseModel):
    name: str
    is_glass_available: bool
    have_material_choice: bool
    have_orientation_choice: bool
    have_type_of_platband_choice: bool
    allowed_sizes: Optional[list[int]] = None


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    is_glass_available: Optional[bool] = None
    have_material_choice: Optional[bool] = None
    have_orientation_choice: Optional[bool] = None
    have_type_of_platband_choice: Optional[bool] = None
    allowed_sizes: Optional[list[int]] = None


class CategoryShow(MainSchema):
    id: int
    name: str
    is_glass_available: bool
    have_material_choice: bool
    have_orientation_choice: bool
    have_type_of_platband_choice: bool
    allowed_sizes: list[int] = []


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
