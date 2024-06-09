from fastapi import APIRouter

from .schemas import ProductBase


router = APIRouter(
    prefix="/product",
    tags=["Product"],
)


@router.post("/test")
async def test_endpoint(data: ProductBase):
    return data
