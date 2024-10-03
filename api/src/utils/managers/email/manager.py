from fastapi_mail import FastMail, MessageSchema

from ....core.config import settings

from .dataclasses import EmailMessageContext


class BaseEmailManager:
    async def send_email(
        self,
        context: EmailMessageContext,
        recipients: list[str],
    ):
        fast_mail = FastMail(settings.smtp.connection_config)
        message = MessageSchema(
            subject=context.subject,
            recipients=recipients,
            body=context.body_message,
            subtype="html",
        )
        await fast_mail.send_message(message)
