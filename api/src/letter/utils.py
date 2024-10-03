from ..utils.managers.email.manager import BaseEmailManager
from ..utils.managers.email.dataclasses import EmailMessageContext

from .schemas import LetterSendSchema


class LetterEmailManager(BaseEmailManager):
    async def send_email_to_recipients(
        self,
        send_data: LetterSendSchema,
        recipients: list,
    ):
        context = EmailMessageContext(
            subject=send_data.subject,
            body_message=send_data.body,
        )
        await self.send_email(context, recipients)
