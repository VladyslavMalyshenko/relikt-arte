from typing import Any, Optional

from fastapi import HTTPException, status


class BasketGetException(HTTPException):
    def __init__(
        self,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Basket not found",
            headers=headers,
        )


class BasketItemAddException(HTTPException):
    def __init__(
        self,
        product_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to add product with id {product_id} to basket",
            headers=headers,
        )
