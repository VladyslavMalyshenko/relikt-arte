from typing import Optional

from ..core.schemas import MainSchema


class ProductRelCreate(MainSchema):
    name: str


class ProductRelUpdate(MainSchema):
    name: Optional[str] = None
    active: Optional[bool] = None


class ProductRelShow(MainSchema):
    id: int
    name: str
    active: bool
