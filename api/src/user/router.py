from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

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
    return await UserService(uow).create_user(data, send_confirmation_email)
