from fastapi_mail import FastMail, MessageSchema

from .schemas import AuthTokenShow
from .dataclasses import AuthTokenEmailMessageContext

from ..core.config import settings


class AuthTokenEmailManager:
    @property
    def registration_confirmation_link(self) -> str:
        return f"{settings.base_url}/api/v1/user/confirm_registration"

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

    async def send_registration_confirmation(self, token_data: AuthTokenShow):
        body_message = f"""
            <p>This is the registration confirmation email.
            Please click the link below to confirm your registration:</p>
            <br/>
            <br/>
            <a href="{self.registration_confirmation_link}/{token_data.token}">Confirm Registration</a>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Registration Confirmation",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_email)
