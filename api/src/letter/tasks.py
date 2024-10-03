import asyncio
import logging
import json

from pydantic import ValidationError

from ..core.celery import app as celery_app

from .schemas import LetterSendSchema
from .utils import LetterEmailManager


log = logging.getLogger(__name__)


@celery_app.task(name="send_letter_to_recipients")
def send_letter_to_recipients(
    send_data: str,
    recipients_emails: list[str],
):
    send_data = json.loads(send_data)
    try:
        send_data = LetterSendSchema(**send_data)
        asyncio.run(
            LetterEmailManager().send_email_to_recipients(send_data, recipients_emails),
        )
    except ValidationError as e:
        log.exception(e.errors())
