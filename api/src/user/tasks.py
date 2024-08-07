import asyncio
import logging
import json

from pydantic import ValidationError

from .schemas import AuthTokenShow
from .utils import AuthTokenEmailManager

from ..core.celery import app as celery_app


log = logging.getLogger(__name__)


@celery_app.task(name="send_registration_email")
def send_registration_email(token_data: str):
    token_data = json.loads(token_data)
    try:
        token_data = AuthTokenShow(**token_data)
        asyncio.run(
            AuthTokenEmailManager().send_registration_confirmation(token_data),
        )
    except ValidationError as e:
        log.exception(e.errors())
    except Exception as e:
        log.exception(e)
