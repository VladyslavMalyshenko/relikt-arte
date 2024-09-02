import logging

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService
from ..user.service import UserService
from ..product.service import ProductService

from ..utils.exceptions.http.user import (
    InvalidCredentialsException,
    UserNotFoundByIdException,
)
from ..utils.exceptions.http.order import (
    BasketGetException,
    BasketItemAddException,
)

from .models import Basket
from .schemas import (
    BasketShow,
    BasketCreate,
    BasketItemList,
    BasketItemShow,
    BasketItemCreate,
)
from .utils import generate_basket_token


log = logging.getLogger(__name__)


class BasketService(BaseService):
    async def get_show_scheme(self, obj: Basket) -> BasketShow:
        return BasketShow(
            id=obj.id,
            user_id=obj.user_id,
            basket_token=obj.basket_token,
            total_value=obj.total_value,
            total_items=obj.total_items,
            items=BasketItemList(
                objects_count=obj.total_items,
                results=[
                    BasketItemShow(
                        id=item.id,
                        product_id=item.product_id,
                        color_id=item.color_id,
                        size_id=item.size_id,
                        covering_id=item.covering_id,
                        glass_color_id=item.glass_color_id,
                        material=item.material,
                        type_of_platband=item.type_of_platband,
                        orientation=item.orientation,
                        with_glass=item.with_glass,
                        quantity=item.quantity,
                        total_price=item.total_price,
                        product=await ProductService(self.uow).get_show_scheme(
                            item.product,
                        ),
                    )
                    for item in obj.items
                ],
            ),
        )

    async def get_basket(self, authorization: str | None = None) -> BasketShow:
        try:
            async with self.uow:
                basket = None
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    basket = await self.uow.basket.get_by_user_id(user.id)
                    if not basket:
                        basket_id = await self.uow.basket.create(
                            obj_in=BasketCreate(
                                user_id=user.id,
                                basket_token=generate_basket_token(),
                            )
                        )
                else:
                    basket_id = await self.uow.basket.create(
                        obj_in=BasketCreate(
                            basket_token=generate_basket_token(),
                        )
                    )
                await self.uow.commit()
                if not basket:
                    basket = await self.uow.basket.get_by_id(obj_id=basket_id)
                return await self.get_show_scheme(basket)
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketGetException()

    async def add_item(
        self,
        item_data: BasketItemCreate,
        authorization: str | None = None,
        basket_token: str | None = None,
    ) -> BasketShow:
        try:
            async with self.uow:
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    basket = await self.uow.basket.get_by_user_id(user.id)
                else:
                    basket = await self.uow.basket.get_by_token(
                        basket_token=basket_token
                    )
                if not basket:
                    raise BasketGetException()
                item_data.basket_id = basket.id
                product = await self.uow.product.get_by_id(
                    obj_id=item_data.product_id
                )
                if not product:
                    raise BasketItemAddException(
                        product_id=item_data.product_id
                    )
                await self.uow.basket_item.create(obj_in=item_data)
                await self.uow.commit()
                return await self.get_show_scheme(basket)
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketItemAddException(product_id=item_data.product_id)
