from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from .service import LetterService
from .schemas import LetterSendSchema


router = APIRouter(
    prefix="/letter",
    tags=["Letter"],
)


@router.post(
    "/send/",
    status_code=status.HTTP_200_OK,
)
async def send_letter(
    uow: uowDEP,
    data: LetterSendSchema,
):
    return await LetterService(uow).send_letter_to_recipients(data)
