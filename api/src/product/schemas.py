from typing import Optional

from pydantic import BaseModel


class ProductDescriptionConstruction(BaseModel):
    main_text: str
    additional_text: str


class ProductDescriptionCovering(BaseModel):
    text: str
    advantages: list[str]


class ProductDescription(BaseModel):
    construction: Optional[ProductDescriptionConstruction] = None
    finishing: Optional[ProductDescriptionCovering] = None
    advantages: Optional[list[str]] = None
    text: Optional[str] = None


class ProductBase(BaseModel):
    description: ProductDescription
