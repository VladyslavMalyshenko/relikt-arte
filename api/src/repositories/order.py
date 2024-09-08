import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

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


class OrderItemRepository(
    GenericRepository[OrderItem, OrderItemCreate, OrderItemUpdate]
):
    def __init__(self, session: AsyncSession):
        super().__init__(session, OrderItem)
