from fastapi import APIRouter, status, Request

from ..core.db.dependencies import uowDEP

from .service import (
    ProductService,
    CategoryService,
    ProductSizeService,
    ProductRelService,
)
from .schemas import (
    ProductCreate,
    ProductUpdate,
    ProductShow,
    CategoryCreate,
    CategoryUpdate,
    CategoryShow,
    ProductSizeCreate,
    ProductSizeUpdate,
    ProductSizeShow,
    ProductRelCreate,
    ProductRelUpdate,
    ProductRelShow,
)
from .enums import ProductRelModelEnum


router = APIRouter(
    prefix="/product",
)


@router.post(
    "/related/{rel_model}/create/",
    status_code=status.HTTP_201_CREATED,
    response_model=ProductRelShow,
    tags=["Product related"],
)
async def create_product_rel_object(
    uow: uowDEP,
    data: ProductRelCreate,
    rel_model: ProductRelModelEnum,
) -> ProductRelShow:
    return await ProductRelService(uow).create_product_rel(
        data=data,
        rel_model=rel_model,
    )


@router.put(
    "/related/{rel_model}/{rel_obj_id}/update/",
    status_code=status.HTTP_200_OK,
    tags=["Product related"],
)
async def update_product_rel_object(
    uow: uowDEP,
    data: ProductRelUpdate,
    rel_obj_id: int,
    rel_model: ProductRelModelEnum,
):
    return await ProductRelService(uow).update_product_rel(
        data=data,
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )


@router.delete(
    "/related/{rel_model}/{rel_obj_id}/delete/",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Product related"],
)
async def delete_product_rel_object(
    uow: uowDEP,
    rel_model: ProductRelModelEnum,
    rel_obj_id: int,
):
    return await ProductRelService(uow).delete_product_rel(
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )


@router.get(
    "/related/{rel_model}/list/",
    status_code=status.HTTP_200_OK,
    response_model=list[ProductRelShow],
    tags=["Product related"],
)
async def get_all_product_rel_objects(
    uow: uowDEP,
    rel_model: ProductRelModelEnum,
) -> list[ProductRelShow]:
    return await ProductRelService(uow).get_product_rel_list(
        rel_model=rel_model,
    )


@router.get(
    "/related/{rel_model}/{rel_obj_id}/",
    status_code=status.HTTP_200_OK,
    tags=["Product related"],
)
async def get_product_rel_object(
    uow: uowDEP,
    rel_model: ProductRelModelEnum,
    rel_obj_id: int,
):
    return await ProductRelService(uow).get_product_rel_obj(
        rel_model=rel_model,
        rel_obj_id=rel_obj_id,
    )


@router.post(
    "/size/create/",
    status_code=status.HTTP_201_CREATED,
    response_model=ProductSizeShow,
    tags=["Product size"],
)
async def create_product_size(
    uow: uowDEP,
    data: ProductSizeCreate,
) -> ProductSizeShow:
    return await ProductSizeService(uow).create_product_size(
        data=data,
    )


@router.put(
    "/size/{size_id}/update/",
    status_code=status.HTTP_200_OK,
    response_model=ProductSizeShow,
    tags=["Product size"],
)
async def update_product_size(
    uow: uowDEP,
    data: ProductSizeUpdate,
    size_id: int,
) -> ProductSizeShow:
    return await ProductSizeService(uow).update_product_size(
        data=data,
        product_size_id=size_id,
    )


@router.delete(
    "/size/{size_id}/delete/",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Product size"],
)
async def delete_product_size(
    uow: uowDEP,
    size_id: int,
):
    return await ProductSizeService(uow).delete_product_size(
        product_size_id=size_id,
    )


@router.get(
    "/size/list/",
    status_code=status.HTTP_200_OK,
    response_model=list[ProductSizeShow],
    tags=["Product size"],
)
async def get_all_product_sizes(
    uow: uowDEP,
) -> list[ProductSizeShow]:
    return await ProductSizeService(uow).get_product_size_list()


@router.get(
    "/size/{size_id}/",
    status_code=status.HTTP_200_OK,
    response_model=ProductSizeShow,
    tags=["Product size"],
)
async def get_product_size(
    uow: uowDEP,
    size_id: int,
) -> ProductSizeShow:
    return await ProductSizeService(uow).get_product_size_obj(
        product_size_id=size_id,
    )


@router.post(
    "/category/create/",
    status_code=status.HTTP_201_CREATED,
    response_model=CategoryShow,
    tags=["Category"],
)
async def create_category(
    uow: uowDEP,
    data: CategoryCreate,
) -> CategoryShow:
    return await CategoryService(uow).create_category(
        data=data,
    )


@router.put(
    "/category/{category_id}/update/",
    status_code=status.HTTP_200_OK,
    response_model=CategoryShow,
    tags=["Category"],
)
async def update_category(
    uow: uowDEP,
    data: CategoryUpdate,
    category_id: int,
) -> CategoryShow:
    return await CategoryService(uow).update_category(
        data=data,
        category_id=category_id,
    )


@router.delete(
    "/category/{category_id}/delete/",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Category"],
)
async def delete_category(
    uow: uowDEP,
    category_id: int,
):
    return await CategoryService(uow).delete_category(
        category_id=category_id,
    )


@router.get(
    "/category/list/",
    status_code=status.HTTP_200_OK,
    response_model=list[CategoryShow],
    tags=["Category"],
)
async def get_all_categories(
    uow: uowDEP,
) -> list[CategoryShow]:
    return await CategoryService(uow).get_category_list()


@router.get(
    "/category/{category_id}/",
    status_code=status.HTTP_200_OK,
    response_model=CategoryShow,
    tags=["Category"],
)
async def get_category(
    uow: uowDEP,
    category_id: int,
) -> CategoryShow:
    return await CategoryService(uow).get_category_obj(
        category_id=category_id,
    )


@router.post(
    "/create/",
    status_code=status.HTTP_201_CREATED,
    response_model=ProductShow,
    tags=["Product"],
)
async def product_create(
    uow: uowDEP,
    data: ProductCreate,
) -> ProductShow:
    return await ProductService(uow).create_product(data)


@router.put(
    "/{product_id}/update/",
    status_code=status.HTTP_200_OK,
    response_model=ProductShow,
    tags=["Product"],
)
async def product_update(
    uow: uowDEP,
    data: ProductUpdate,
    product_id: int,
) -> ProductShow:
    return await ProductService(uow).update_product(
        data=data,
        product_id=product_id,
    )


@router.delete(
    "/{product_id}/delete/",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Product"],
)
async def product_delete(
    uow: uowDEP,
    product_id: int,
):
    return await ProductService(uow).delete_product(
        product_id=product_id,
    )


@router.get(
    "/list/",
    status_code=status.HTTP_200_OK,
    response_model=list[ProductShow],
    tags=["Product"],
)
async def get_all_products(
    uow: uowDEP,
) -> list[ProductShow]:
    return await ProductService(uow).get_product_list()


@router.get(
    "/{product_id}/",
    status_code=status.HTTP_200_OK,
    response_model=ProductShow,
    tags=["Product"],
)
async def get_product(
    uow: uowDEP,
    product_id: int,
) -> ProductShow:
    return await ProductService(uow).get_product_obj(
        product_id=product_id,
    )


# @router.post(
#     "/create/",
#     status_code=status.HTTP_201_CREATED,
#     tags=["Product"],
# )
# async def product_create(
#     uow: uowDEP,
#     request: Request,
# ):
#     form_data = await request.form()

#     photo_keys_count = int(len(form_data.items()) / 2)
#     photos_data = {}
#     for file_num in range(1, photo_keys_count + 1):
#         photos_data[f"file_{file_num}"] = {}
#         photos_data[f"file_{file_num}"]["photo"] = form_data[
#             f"file_{file_num}"
#         ]
#         dependency_data = json.loads(form_data[f"file_{file_num}_dep"])
#         photos_data[f"file_{file_num}"].update(dependency_data)

#     print(photos_data)
#     return {}
