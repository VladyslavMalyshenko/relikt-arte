from ..utils.enums import BaseEnum


class ProductPhotoDepEnum(BaseEnum):
    COLOR = "color"
    GLASS_AVAILABILITY = "glass availability"
    ORIENTATION = "orientation"
    SIZE = "size"
    TYPE_OF_PLATBAND = "type of platband"


class ProductOrientationEnum(BaseEnum):
    LEFT = "left"
    RIGHT = "right"


class ProductRelModelEnum(BaseEnum):
    CATEGORY = "product_category"
    COLOR = "product_color"
    COVERING = "product_covering"
    GLASS_COLOR = "product_glass_color"

    @property
    def _name_mapping(self):
        return {
            self.CATEGORY: "category",
            self.COLOR: "color",
            self.COVERING: "covering",
            self.GLASS_COLOR: "glass color",
        }

    def get_name(self):
        return self._name_mapping[self.value]
