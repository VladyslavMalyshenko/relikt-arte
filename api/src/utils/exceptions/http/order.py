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


class BasketItemUpdateException(HTTPException):
    def __init__(
        self,
        item_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to update item with id {item_id}",
            headers=headers,
        )


class BasketItemRemoveException(HTTPException):
    def __init__(
        self,
        item_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to remove item with id {item_id}",
            headers=headers,
        )


class OrderCreateException(HTTPException):
    def __init__(
        self,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create order",
            headers=headers,
        )


class OrderUpdateException(HTTPException):
    def __init__(
        self,
        order_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to update order with id {order_id}",
            headers=headers,
        )


class OrderDeleteException(HTTPException):
    def __init__(
        self,
        order_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to delete order with id {order_id}",
            headers=headers,
        )


class OrderGetException(HTTPException):
    def __init__(
        self,
        order_id: int,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order with id {order_id} not found",
            headers=headers,
        )
