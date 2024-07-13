from sqladmin import ModelView

from .product.model_views import get_product_model_views


def get_model_views() -> list[ModelView]:
    return [] + get_product_model_views()
