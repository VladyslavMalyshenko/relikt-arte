from .schemas import AuthTokenShow
from .dataclasses import AuthTokenEmailMessageContext

from ..core.config import settings

from ..utils.managers.email.manager import BaseEmailManager


class AuthTokenEmailManager(BaseEmailManager):
    @property
    def registration_confirmation_link(self) -> str:
        return f"{settings.frontend_app.base_url}/{settings.frontend_app.registration_confirm_path}"

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

    async def send_password_reset(self, token_data: AuthTokenShow):
        body_message = f"""
            <p>This is the password reset email.
            Please click the link below to reset your password:</p>
            <br/>
            <br/>
            <a href="{settings.frontend_app.base_url}/{settings.frontend_app.password_reset_path}/{token_data.token}">Reset Password</a>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Password Reset",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_email)

    async def send_email_change_confirmation(self, token_data: AuthTokenShow):
        body_message = f"""
            <p>This is the email change confirmation email.
            Please click the link below to confirm your email change:</p>
            <br/>
            <br/>
            <a href="{settings.frontend_app.base_url}/{settings.frontend_app.email_change_confirm_path}/{token_data.token}">Confirm Email Change</a>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Email Change Confirmation",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_email)
