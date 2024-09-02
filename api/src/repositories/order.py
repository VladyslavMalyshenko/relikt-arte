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
)


class BasketRepository(GenericRepository[Basket, BasketCreate, BasketUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Basket)

    async def get_by_user_id(self, user_id: uuid.UUID) -> Basket:
        query = (
            select(self.model)
            .where(self.model.user_id == user_id)
            .options(
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
        )
        res = await self.session.execute(query)
        return res.scalar()


class BasketItemRepository(
    GenericRepository[BasketItem, BasketItemCreate, BasketItemUpdate]
):
    def __init__(self, session: AsyncSession):
        super().__init__(session, BasketItem)
