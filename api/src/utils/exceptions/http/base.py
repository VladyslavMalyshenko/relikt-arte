from typing import TypeVar, Generic, Optional, Any
from uuid import UUID

from fastapi import HTTPException, status

from ....core.db.base import Base


ModelType = TypeVar("ModelType", bound=Base)


class ContentNoChangeException(HTTPException):
    def __init__(
        self,
        detail: Any = None,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            headers=headers,
        )


class IdNotFoundException(HTTPException, Generic[ModelType]):
    def __init__(
        self,
        id: int | UUID,
        model: Optional[type[ModelType]] = None,
        model_name: Optional[str] = None,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{model.__label__ if model else model_name} with id {id} not found",
            headers=headers,
        )


class ObjectCreateException(HTTPException):
    _operation: str = "create"

    def __init__(
        self,
        object_name: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to {self._operation} {object_name}",
            headers=headers,
        )


class ObjectUpdateException(ObjectCreateException):
    _operation: str = "update"
