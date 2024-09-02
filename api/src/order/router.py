from fastapi import APIRouter

from ..core.db.dependencies import uowDEP
from ..user.dependencies import authorization

from .schemas import BasketShow, BasketItemCreate
from .service import BasketService


router = APIRouter(
    prefix="/order",
)


@router.get("/basket/", response_model=BasketShow, tags=["Basket"])
async def get_basket(
    authorization: authorization,
    uow: uowDEP,
) -> BasketShow:
    return await BasketService(uow).get_basket(authorization)


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
