from fastapi import APIRouter

from ..core.db.dependencies import uowDEP
from ..user.dependencies import authorization

from .schemas import (
    BasketShow,
    BasketItemCreate,
    BasketItemUpdate,
    OrderCreate,
    OrderShow,
)
from .service import BasketService, OrderService


router = APIRouter(
    prefix="/order",
)


@router.get("/basket/", response_model=BasketShow, tags=["Basket"])
async def get_basket(
    authorization: authorization,
    uow: uowDEP,
    basket_token: str = None,
) -> BasketShow:
    return await BasketService(uow).get_basket(authorization, basket_token)


@router.post("/basket/add_item/", response_model=BasketShow, tags=["Basket"])
async def add_item_to_basket(
    basket_item: BasketItemCreate,
    authorization: authorization,
    uow: uowDEP,
    basket_token: str = None,
) -> BasketShow:
    return await BasketService(uow).add_item(
        item_data=basket_item,
        authorization=authorization,
        basket_token=basket_token,
    )


@router.put(
    "/basket/update_item/{item_id}/",
    response_model=BasketShow,
    tags=["Basket"],
)
async def update_item_in_basket(
    basket_item: BasketItemUpdate,
    item_id: int,
    authorization: authorization,
    uow: uowDEP,
    basket_token: str = None,
) -> BasketShow:
    return await BasketService(uow).update_item(
        item_data=basket_item,
        item_id=item_id,
        authorization=authorization,
        basket_token=basket_token,
    )


@router.delete(
    "/basket/remove_item/{item_id}/",
    response_model=bool,
    tags=["Basket"],
)
async def remove_item_from_basket(
    uow: uowDEP,
    item_id: int,
) -> bool:
    return await BasketService(uow).remove_item(
        item_id=item_id,
    )


# @router.post("/order/", response_model=OrderShow, tags=["Order"])
# async def create_order(
#     order_data: OrderCreate,
#     authorization: authorization,
#     uow: uowDEP,
#     basket_token: str = None,
# ) -> OrderShow:
#     return await OrderService(uow).create_order(
#         order_data=order_data,
#         authorization=authorization,
#         basket_token=basket_token,
#     )
