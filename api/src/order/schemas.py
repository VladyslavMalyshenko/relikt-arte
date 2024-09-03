import uuid

from typing import Optional

from ..core.schemas import MainSchema, BaseListSchema
from ..product.schemas import ProductShow
from ..product.enums import ProductTypeOfPlatbandEnum, ProductOrientationEnum

from .enums import ItemMaterialEnum


class BasketItemShow(MainSchema):
    id: int
    product_id: int
    color_id: Optional[int] = None
    size_id: Optional[int] = None
    covering_id: Optional[int] = None
    glass_color_id: Optional[int] = None
    material: Optional[ItemMaterialEnum] = None
    type_of_platband: Optional[ProductTypeOfPlatbandEnum] = None
    orientation: Optional[ProductOrientationEnum] = None
    with_glass: Optional[bool] = None
    quantity: int
    total_price: int
    product: ProductShow


class BaseBasketItem(MainSchema):
    basket_id: Optional[int] = None
    color_id: Optional[int] = None
    size_id: Optional[int] = None
    covering_id: Optional[int] = None
    glass_color_id: Optional[int] = None
    material: Optional[ItemMaterialEnum] = None
    type_of_platband: Optional[ProductTypeOfPlatbandEnum] = None
    orientation: Optional[ProductOrientationEnum] = None
    with_glass: Optional[bool] = None
    quantity: int


class BasketItemCreate(BaseBasketItem):
    product_id: int


class BasketItemUpdate(BaseBasketItem):
    quantity: Optional[int] = None


BasketItemList = BaseListSchema[BasketItemShow]


class BasketShow(MainSchema):
    id: int
    user_id: Optional[uuid.UUID] = None
    basket_token: Optional[str] = None
    total_value: int
    total_items: int
    items: Optional[BasketItemList] = None


class BasketCreate(MainSchema):
    user_id: Optional[uuid.UUID] = None
    basket_token: Optional[str] = None


class BasketUpdate(BasketCreate):
    pass
