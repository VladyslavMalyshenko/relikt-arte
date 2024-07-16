from typing import Optional, Any

from pydantic import BaseModel

from ..core.schemas import MainSchema


class ProductDescriptionConstruction(BaseModel):
    main_text: Optional[str] = None
    additional_text: Optional[str] = None


class ProductDescriptionFinishingCovering(BaseModel):
    text: Optional[str] = None
    advantages: list[str] = []


class ProductDescriptionFinishing(BaseModel):
    covering: ProductDescriptionFinishingCovering


class ProductDescription(BaseModel):
    construction: Optional[ProductDescriptionConstruction] = None
    advantages: list[str] = []
    finishing: Optional[ProductDescriptionFinishing] = None
    text: Optional[str] = None


class ProductCreate(BaseModel):
    price: int
    description: Optional[ProductDescription] = None
    have_glass: bool
    orientation_choice: bool
    category_id: int
    covering_id: Optional[int] = None
    photos_data: Any


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
    active: bool


class ProductRelUpdate(BaseModel):
    name: Optional[str] = None
    active: Optional[bool] = None


class ProductRelShow(MainSchema):
    id: int
    name: str
    active: bool
