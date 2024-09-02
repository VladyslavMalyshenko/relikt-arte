from ..utils.enums import BaseEnum


class ItemMaterialEnum(BaseEnum):
    WOOD = "wood"
    MDF = "mdf"


class OrderStatusEnum(BaseEnum):
    NEW = "new"
    ACCEPTED = "accepted"
    READY_FOR_SHIPMENT = "ready_for_shipment"
