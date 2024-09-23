from fastapi_mail import FastMail, MessageSchema

from ....core.config import settings

from .dataclasses import AuthTokenEmailMessageContext


class BaseEmailManager:
    async def send_email(
        self,
        context: AuthTokenEmailMessageContext,
        recipient: str,
    ):
        fast_mail = FastMail(settings.smtp.connection_config)
        message = MessageSchema(
            subject=context.subject,
            recipients=[recipient],
            body=context.body_message,
            subtype="html",
        )
        await fast_mail.send_message(message)
