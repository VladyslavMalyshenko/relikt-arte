from ..utils.enums import BaseEnum


class ProductOrientation(BaseEnum):
    LEFT = "left"
    RIGHT = "right"


class ProductRelModel(BaseEnum):
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
