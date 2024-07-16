from typing import Annotated, Optional, Any

from fastapi import Depends, Form, UploadFile, File

from .schemas import ProductDescription, ProductCreate


def product_create(
    # price: int = Form(None),
    # desc_construction_main_text: Optional[str] = Form(None),
    # desc_construction_additional_text: Optional[str] = Form(None),
    # desc_advantages: Optional[list] = Form(None),
    # desc_finishing_covering_text: Optional[str] = Form(None),
    # desc_finishing_covering_advantages: Optional[str] = Form(None),
    # desc_text: Optional[str] = Form(None),
    photos_data: Any = Form(None),
    # have_glass: bool = Form(None),
    # orientation_choice: bool = Form(None),
    # category_id: int = Form(None),
    # covering_id: Optional[int] = Form(None),
):
    return ProductCreate(
        price=1000,
        # description=description,
        have_glass=True,
        orientation_choice=True,
        category_id=0,
        covering_id=None,
        photos_data=photos_data,
    )


product_create_dep = Annotated[
    ProductCreate,
    Depends(product_create),
]
