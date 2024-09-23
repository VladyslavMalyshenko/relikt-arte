from fastapi import APIRouter

from ..core.caching import cache

from .schemas import NovaPostArea, NovaPostCity, NovaPostWarehouse
from .utils import NovaPostAPIManager


router = APIRouter(
    prefix="/nova_post",
    tags=["Nova Post"],
)


@router.get("/areas/", response_model=list[NovaPostArea])
@cache(expire=3600)
async def get_areas() -> list[NovaPostArea]:
    return NovaPostAPIManager().get_areas()


@router.get(
    "/cities/{area_ref}/",
    response_model=list[NovaPostCity],
)
async def get_cities_by_area(area_ref: str) -> list[NovaPostCity]:
    return NovaPostAPIManager().get_cities_by_area(area_ref)


@router.get(
    "/warehouses/{city_ref}/",
    response_model=list[NovaPostWarehouse],
)
@cache(expire=3600)
async def get_warehouses_by_city(city_ref: str) -> list[NovaPostWarehouse]:
    return NovaPostAPIManager().get_warehouses_by_city(city_ref)
