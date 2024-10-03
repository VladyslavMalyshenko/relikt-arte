import logging

from pydantic import BaseModel

from ..core.db.service import BaseService

from .schemas import LetterSendSchema
from .tasks import send_letter_to_recipients


log = logging.getLogger(__name__)


class LetterService(BaseService):
    async def get_show_scheme(self, obj) -> BaseModel:
        return await super().get_show_scheme(obj)

    async def send_letter_to_recipients(
        self,
        send_data: LetterSendSchema,
    ):
        try:
            async with self.uow:
                recipients = await self.uow.user.get_by_ids(
                    obj_ids=send_data.recipients_ids,
                    filters=[
                        self.uow.user.model.is_active,
                    ],
                )
                if recipients:
                    recipients_emails = [
                        recipient.email for recipient in recipients
                    ]
                    print(recipients_emails)
                    send_letter_to_recipients.delay(
                        send_data.model_dump_json(),
                        recipients_emails,
                    )
                return True
        except Exception as e:
            log.exception(e)
            return False
