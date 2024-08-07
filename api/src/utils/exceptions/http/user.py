from typing import Any, Optional

from fastapi import HTTPException, status


class UserNotFoundByEmailException(HTTPException):
    def __init__(
        self,
        email: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email: {email} not found",
            headers=headers,
        )


class TokenNotFoundException(HTTPException):
    def __init__(
        self,
        token: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Token: {token} not found",
            headers=headers,
        )


class InvalidTokenTypeException(HTTPException):
    def __init__(
        self,
        token: str,
        token_type: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid token type: {token_type} for token: {token}",
            headers=headers,
        )


class TokenExpiredException(HTTPException):
    def __init__(
        self,
        token: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Token: {token} has expired",
            headers=headers,
        )
