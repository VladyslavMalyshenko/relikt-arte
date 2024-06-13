from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from .service import ProductRelService
from .schemas import ProductCreate, ProductRelCreate
from .enums import ProductRelModel

# from .utils import _default_product_description_json


router = APIRouter(
    prefix="/product",
    tags=["Product"],
)


@router.post("/related/{rel_model}/create/", status_code=status.HTTP_201_CREATED)
async def create_product_rel_object(
    uow: uowDEP,
    data: ProductRelCreate,
    rel_model: ProductRelModel,
):
    return await ProductRelService(uow).create_product_rel(
        data=data,
        rel_model=rel_model,
    )


def clean_dict(d: dict):
    """Recursively remove None values and empty lists from the dictionary."""
    if not isinstance(d, dict):
        return d

    clean_d = {}
    for key, value in d.items():
        if isinstance(value, dict):
            nested_cleaned = clean_dict(value)
            if nested_cleaned:
                clean_d[key] = nested_cleaned
        elif isinstance(value, list):
            cleaned_list = [
                clean_dict(item)
                for item in value
                if item or isinstance(item, bool)
            ]
            if cleaned_list:
                clean_d[key] = cleaned_list
        elif value or isinstance(
            value, bool
        ):  # Include False but exclude None
            clean_d[key] = value
    return clean_d


@router.post("/create")
async def test_endpoint(data: ProductCreate):
    if data.description:
        description_dict = dict(data.description)
        cleaned_description = clean_dict(description_dict)
        return cleaned_description
    return data
