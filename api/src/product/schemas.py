from typing import Optional

from pydantic import BaseModel

from ..core.schemas import MainSchema
from .enums import ProductOrientation


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


class ProductShow(MainSchema):
    id: int
    name: str
    price: int
    orientation: Optional[ProductOrientation] = None
    have_glass: bool
    description: ProductDescription


class ProductCreate(MainSchema):
    name: str
    price: int
    orientation: Optional[ProductOrientation] = None
    have_glass: bool
    description: Optional[ProductDescription] = None
    photo: str
    category_id: int
    color_id: int
    covering_id: Optional[int] = None
    glass_color_id: Optional[int] = None


class ProductUpdate(MainSchema):
    pass


class ProductRelCreate(MainSchema):
    name: str


class ProductRelUpdate(ProductRelCreate):
    active: Optional[bool] = None


class ProductRelShow(MainSchema):
    id: int
    name: str
    active: bool
