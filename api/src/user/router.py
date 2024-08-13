from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from ..utils.exceptions.user import UserByEmailAlreadyExistsException
from ..utils.exceptions.http.base import ObjectCreateException

from .service import UserService
from .schemas import (
    UserCreate,
    UserShow,
    UserAuth,
    JWTTokensSchema,
    TokenVerifyOrRefreshSchema,
)


router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@router.post(
    "/create/",
    status_code=status.HTTP_201_CREATED,
    response_model=UserShow,
)
async def create_user(
    uow: uowDEP,
    data: UserCreate,
    send_confirmation_email: bool = True,
) -> UserShow:
    try:
        return await UserService(uow).create_user(
            data, send_confirmation_email
        )
    except UserByEmailAlreadyExistsException as e:
        raise ObjectCreateException(message=e.error)


@router.post(
    "/confirm_registration/{token}/",
    status_code=status.HTTP_200_OK,
    response_model=bool,
)
async def confirm_registration(uow: uowDEP, token: str) -> bool:
    return await UserService(uow).confirm_registration(token)


@router.post(
    "/auth/",
    status_code=status.HTTP_200_OK,
    response_model=JWTTokensSchema,
)
async def auth_user(
    uow: uowDEP,
    data: UserAuth,
    as_admin: bool = False,
) -> JWTTokensSchema:
    return await UserService(uow).authenticate_user(data, as_admin)


@router.post(
    "/token/verify/",
    status_code=status.HTTP_200_OK,
    response_model=bool,
)
async def verify_token(
    uow: uowDEP,
    token_data: TokenVerifyOrRefreshSchema,
    as_admin: bool = False,
) -> bool:
    return await UserService(uow).verify_user_token(token_data, as_admin)


@router.post(
    "/token/refresh_from_access/",
    status_code=status.HTTP_200_OK,
    response_model=JWTTokensSchema,
)
async def refresh_token_from_access(
    uow: uowDEP,
    token_data: TokenVerifyOrRefreshSchema,
    as_admin: bool = False,
) -> JWTTokensSchema:
    return await UserService(uow).get_user_access_from_refresh(
        token_data,
        as_admin,
    )
