from pydantic import BaseModel


class BaseNovaPostDataObj(BaseModel):
    ref: str
    description: str


class NovaPostArea(BaseNovaPostDataObj):
    pass


class NovaPostCity(BaseNovaPostDataObj):
    city_id: str
    settlement_type: str
    settlement_type_description: str


class NovaPostWarehouse(BaseNovaPostDataObj):
    short_address: str
    type_of_warehouse: str
    phone: str
    number: str
    total_max_weight_allowed: str
    place_max_weight_allowed: str
    reception: dict
    city_description: str
