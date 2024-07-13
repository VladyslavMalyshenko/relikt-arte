from sqladmin import ModelView

from ...product.models import (
    Product,
    ProductSize,
    ProductColor,
    ProductCovering,
    ProductGlassColor,
    ProductPhoto,
)


class ProductModelView(ModelView, model=Product):
    name_plural = "Products"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


class ProductSizeModelView(ModelView, model=ProductSize):
    name_plural = "Product Sizes"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


class ProductColorModelView(ModelView, model=ProductColor):
    name_plural = "Product Colors"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


class ProductCoveringModelView(ModelView, model=ProductCovering):
    name_plural = "Product Coverings"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


class ProductGlassColorModelView(ModelView, model=ProductGlassColor):
    name_plural = "Product Glass Colors"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


class ProductPhotoModelView(ModelView, model=ProductPhoto):
    name_plural = "Product Photos"
    page_size = 100
    form_excluded_columns = [
        "created_at",
        "updated_at",
    ]
    can_create = True
    can_edit = True


def get_product_model_views() -> list[ModelView]:
    return [
        ProductModelView,
        ProductSizeModelView,
        ProductColorModelView,
        ProductCoveringModelView,
        ProductGlassColorModelView,
        ProductPhotoModelView,
    ]
