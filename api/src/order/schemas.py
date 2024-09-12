import uuid

from typing import Optional

from ..core.schemas import MainSchema, BaseListSchema
from ..product.schemas import ProductShow
from ..product.enums import ProductTypeOfPlatbandEnum, ProductOrientationEnum

from .enums import ItemMaterialEnum, OrderStatusEnum


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
    quantity: Optional[int] = None


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


class OrderItemShow(MainSchema):
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


OrderItemList = BaseListSchema[OrderItemShow]


class OrderShow(MainSchema):
    id: int
    user_id: Optional[uuid.UUID] = None
    full_name: str
    phone: str
    email: str
    region: str
    city_or_settlement: str
    warehouse: Optional[str] = None
    delivery_address: Optional[str] = None
    additional_info: Optional[str] = None
    items: Optional[OrderItemList] = None
    status: OrderStatusEnum
    total_value: int
    total_items: int
    created_at: str
    updated_at: str


class OrderItemCreate(MainSchema):
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


class OrderItemUpdate(MainSchema):
    color_id: Optional[int] = None
    size_id: Optional[int] = None
    covering_id: Optional[int] = None
    glass_color_id: Optional[int] = None
    material: Optional[ItemMaterialEnum] = None
    type_of_platband: Optional[ProductTypeOfPlatbandEnum] = None
    orientation: Optional[ProductOrientationEnum] = None
    with_glass: Optional[bool] = None
    quantity: Optional[int] = None


class OrderCreate(MainSchema):
    user_id: Optional[uuid.UUID] = None
    full_name: str
    phone: str
    email: str
    region: str
    city_or_settlement: str
    warehouse: Optional[str] = None
    delivery_address: Optional[str] = None
    additional_info: Optional[str] = None
    items: Optional[OrderItemCreate] = None
    status: OrderStatusEnum


class OrderUpdate(MainSchema):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    region: Optional[str] = None
    city_or_settlement: Optional[str] = None
    warehouse: Optional[str] = None
    delivery_address: Optional[str] = None
    additional_info: Optional[str] = None
    status: Optional[OrderStatusEnum] = None
