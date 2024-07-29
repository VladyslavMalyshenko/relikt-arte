from typing import Any, Optional

from fastapi import status
from fastapi.exceptions import HTTPException


class FilterProcessException(HTTPException):
    def __init__(
        self,
        detail: Any = "Something went wrong with filters processing",
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            headers=headers,
        )
