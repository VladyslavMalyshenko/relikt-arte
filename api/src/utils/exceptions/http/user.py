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


class UserNotFoundByIdException(HTTPException):
    def __init__(
        self,
        user_id: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id: {user_id} not found",
            headers=headers,
        )


class InvalidCredentialsException(HTTPException):
    def __init__(
        self,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid credentials",
            headers=headers,
        )


class UserInvalidPasswordException(HTTPException):
    def __init__(
        self,
        email: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The password for user with email: {email} is invalid",
            headers=headers,
        )


class UserInactiveException(HTTPException):
    def __init__(
        self,
        email: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User with email: {email} is inactive. Check your email for registration confirmation link or contact support",
            headers=headers,
        )


class UserIsNotAdminException(HTTPException):
    def __init__(
        self,
        email: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User with email: {email} is not an admin",
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


class InvalidTokenException(HTTPException):
    def __init__(
        self,
        token: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid token: {token}",
            headers=headers,
        )


class InvalidTokenUserException(HTTPException):
    def __init__(
        self,
        token: str,
        headers: Optional[dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Token: {token} does not belong to the user or user_id is invalid",
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
