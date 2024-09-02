from dataclasses import dataclass


@dataclass
class BaseNovaPostDataObj:
    ref: str
    description: str


@dataclass
class NovaPostArea(BaseNovaPostDataObj):
    pass


@dataclass
class NovaPostCity(BaseNovaPostDataObj):
    city_id: str
    settlement_type: str
    settlement_type_description: str


@dataclass
class NovaPostWarehouse(BaseNovaPostDataObj):
    short_address: str
    type_of_warehouse: str
    phone: str
    number: str
    total_max_weight_allowed: str
    place_max_weight_allowed: str
    reception: dict
    city_description: str
