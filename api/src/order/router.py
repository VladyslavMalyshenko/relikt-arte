from fastapi import APIRouter

from ..core.db.dependencies import uowDEP
from ..core.dependencies import pagination_params
from ..user.dependencies import authorization
from ..utils.processors.filters.dependencies import filters_decoder

from .schemas import (
    BasketShow,
    BasketItemCreate,
    BasketItemUpdate,
    OrderCreate,
    OrderShow,
    OrderUpdate,
    OrderListSchema,
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


@router.post("/create/", response_model=OrderShow, tags=["Order"])
async def create_order(
    order_data: OrderCreate,
    authorization: authorization,
    uow: uowDEP,
    basket_token: str = None,
) -> int:
    return await OrderService(uow).create_order(
        data=order_data,
        authorization=authorization,
        basket_token=basket_token,
    )


@router.get(
    "/list/",
    tags=["Order"],
)
async def get_order_list(
    pagination: pagination_params,
    filters_decoder: filters_decoder = None,
    uow: uowDEP = uowDEP,
) -> OrderListSchema | list[OrderShow]:
    return await OrderService(uow).get_order_list(
        pagination=pagination,
        filters_decoder=filters_decoder,
    )


@router.get("/{order_id}/", response_model=OrderShow, tags=["Order"])
async def get_order(
    order_id: int,
    uow: uowDEP,
) -> OrderShow:
    return await OrderService(uow).get_order(
        order_id=order_id,
    )


@router.put("/update/{order_id}/", response_model=OrderShow, tags=["Order"])
async def update_order(
    order_id: int,
    order_data: OrderUpdate,
    uow: uowDEP,
) -> OrderShow:
    return await OrderService(uow).update_order(
        order_id=order_id,
        data=order_data,
    )


@router.delete("/delete/{order_id}/", response_model=bool, tags=["Order"])
async def delete_order(
    order_id: int,
    uow: uowDEP,
) -> list[OrderShow]:
    return await OrderService(uow).delete_order(
        order_id=order_id,
    )
