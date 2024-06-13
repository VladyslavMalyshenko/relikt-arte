from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from .service import ProductRelService
from .schemas import ProductRelCreate, ProductRelUpdate
from .enums import ProductRelModel


router = APIRouter(
    prefix="/product",
    tags=["Product"],
)


@router.post(
    "/related/{rel_model}/create/",
    status_code=status.HTTP_201_CREATED,
)
async def create_product_rel_object(
    uow: uowDEP,
    data: ProductRelCreate,
    rel_model: ProductRelModel,
):
    return await ProductRelService(uow).create_product_rel(
        data=data,
        rel_model=rel_model,
    )


@router.put(
    "/related/{rel_model}/{rel_obj_id}/update/",
    status_code=status.HTTP_200_OK,
)
async def update_product_rel_object(
    uow: uowDEP,
    data: ProductRelUpdate,
    rel_obj_id: int,
    rel_model: ProductRelModel,
):
    return await ProductRelService(uow).update_product_rel(
        data=data,
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )


@router.delete(
    "/related/{rel_model}/{rel_obj_id}/delete/",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_product_rel_object(
    uow: uowDEP,
    rel_model: ProductRelModel,
    rel_obj_id: int,
):
    return await ProductRelService(uow).delete_product_rel(
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )


@router.get(
    "/related/{rel_model}/{rel_obj_id}/",
    status_code=status.HTTP_200_OK,
)
async def get_product_rel_object(
    uow: uowDEP,
    rel_model: ProductRelModel,
    rel_obj_id: int,
):
    return await ProductRelService(uow).get_product_rel_obj(
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )
