import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from .generic import GenericRepository


from ..order.models import (
    Basket,
    BasketItem,
    Order,
    OrderItem,
)
from ..product.models import Product
from ..order.schemas import (
    BasketCreate,
    BasketUpdate,
    BasketItemCreate,
    BasketItemUpdate,
    OrderCreate,
    OrderUpdate,
    OrderItemCreate,
    OrderItemUpdate,
)
from ..order.enums import OrderStatusEnum


class BasketRepository(GenericRepository[Basket, BasketCreate, BasketUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Basket)

    async def _add_default_options(self, options: list | None) -> list:
        default_options = (
            selectinload(self.model.items).options(
                selectinload(
                    BasketItem.product,
                ).options(
                    selectinload(
                        Product.photos,
                    )
                ),
            ),
        )
        if not options:
            options = default_options
        else:
            options.append(default_options)
        return options

    async def get_by_id(
        self,
        *,
        obj_id: uuid.UUID,
        options: list | None = None,
    ) -> Basket:
        options = await self._add_default_options(options)
        return await super().get_by_id(obj_id=obj_id, options=options)

    async def get_by_user_id(
        self,
        user_id: uuid.UUID,
        options: list | None = None,
    ) -> Basket:
        options = await self._add_default_options(options)
        return await self.get_by_attr(
            self.model.user_id,
            user_id,
            options=options,
        )

    async def get_by_token(
        self,
        token: str,
        options: list | None = None,
    ) -> Basket:
        options = await self._add_default_options(options)
        return await self.get_by_attr(
            self.model.basket_token,
            token,
            options=options,
        )


class BasketItemRepository(
    GenericRepository[BasketItem, BasketItemCreate, BasketItemUpdate]
):
    def __init__(self, session: AsyncSession):
        super().__init__(session, BasketItem)


class OrderRepository(GenericRepository[Order, OrderCreate, OrderUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Order)

    async def _add_default_options(self, options: list | None = None) -> list:
        default_options = (
            selectinload(self.model.items).options(
                selectinload(
                    OrderItem.product,
                ).options(
                    selectinload(
                        Product.photos,
                    )
                ),
                selectinload(OrderItem.color),
                selectinload(OrderItem.size),
                selectinload(OrderItem.covering),
                selectinload(OrderItem.glass_color),
            ),
        )
        if not options:
            options = default_options
        else:
            options.append(default_options)
        return options

    async def create(
        self,
        *,
        obj_in: OrderCreate,
        clean_dict_ignore_keys: list | None = None,
        **kwargs,
    ) -> Order:
        order = self.model(
            full_name=obj_in.full_name,
            phone=obj_in.phone,
            email=obj_in.email,
            region=obj_in.region,
            city_or_settlement=obj_in.city_or_settlement,
            warehouse=obj_in.warehouse,
            delivery_address=obj_in.delivery_address,
            additional_info=obj_in.additional_info,
            status=OrderStatusEnum.NEW,
        )
        return order

    async def get_by_id(
        self, *, obj_id: int | uuid.UUID, options: list | None = None
    ) -> Order:
        options = await self._add_default_options(options)
        return await super().get_by_id(obj_id=obj_id, options=options)


class OrderItemRepository(
    GenericRepository[OrderItem, OrderItemCreate, OrderItemUpdate]
):
    def __init__(self, session: AsyncSession):
        super().__init__(session, OrderItem)

    async def create(
        self,
        *,
        obj_in: OrderItemCreate,
        order_id: int,
        clean_dict_ignore_keys: list | None = None,
        **kwargs,
    ) -> OrderItem:
        order_item = self.model(
            order_id=order_id,
            product_id=obj_in.product_id,
            color_id=obj_in.color_id,
            size_id=obj_in.size_id,
            covering_id=obj_in.covering_id,
            glass_color_id=obj_in.glass_color_id,
            material=obj_in.material,
            type_of_platband=obj_in.type_of_platband,
            orientation=obj_in.orientation,
            with_glass=obj_in.with_glass,
            quantity=obj_in.quantity,
        )
        return order_item
