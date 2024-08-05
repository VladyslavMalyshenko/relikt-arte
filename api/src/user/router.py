from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from ..utils.exceptions.user import UserByEmailAlreadyExistsException
from ..utils.exceptions.http.base import ObjectCreateException

from .service import UserService
from .schemas import UserCreate, UserShow


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
    response_model=bool
)
async def confirm_registration(
    uow: uowDEP,
    token: str
) -> bool:
    return await UserService(uow).confirm_registration(token)
