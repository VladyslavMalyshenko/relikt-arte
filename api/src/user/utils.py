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
            <p>Вітаємо у спільноті Relict Arte!</p>
            <p>Дякуємо за реєстрацію на нашій платформі. Для завершення процесу реєстрації, будь ласка, підтвердьте свою електронну пошту, натиснувши на посилання нижче:</p>
            <p>
                <a href="{self.registration_confirmation_link}/{token_data.token}"
                style="background-color:#007bff;color:#ffffff;padding:10px 20px;border-radius:5px;text-decoration:none;">
                Підтвердити реєстрацію
                </a>
            </p>
            <br/>
            <p>Якщо ви не реєструвалися на нашій платформі, просто проігноруйте це повідомлення.</p>
            <p>З повагою, команда Relict Arte</p>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Підтвердження реєстрації",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_email)

    async def send_password_reset(self, token_data: AuthTokenShow):
        body_message = f"""
            <p>Вітаємо!</p>
            <p>Ми отримали запит на скидання пароля для вашого облікового запису на платформі Relict Arte.</p>
            <p>Для відновлення пароля, будь ласка, натисніть на посилання нижче:</p>
            <p>
                <a href="{settings.frontend_app.base_url}/{settings.frontend_app.password_reset_path}/{token_data.token}"
                style="background-color:#007bff;color:#ffffff;padding:10px 20px;border-radius:5px;text-decoration:none;">
                Скинути пароль
                </a>
            </p>
            <br/>
            <p>Якщо ви не робили цього запиту, просто проігноруйте це повідомлення.</p>
            <p>З повагою, команда Relict Arte</p>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Скидання пароля",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_email)

    async def send_email_change_confirmation(self, token_data: AuthTokenShow):
        body_message = f"""
            <div style="line-height:1.5;">
                <p style="margin: 0;">Вітаємо!</p>
                <p style="margin: 0;">Ми отримали запит на зміну електронної пошти для вашого облікового запису на платформі Relict Arte.</p>
                <p style="margin: 0;">Щоб підтвердити зміну електронної пошти, будь ласка, натисніть на посилання нижче:</p>
                <p style="margin: 0;">
                    <a href="{settings.frontend_app.base_url}/{settings.frontend_app.email_change_confirm_path}/{token_data.token}"
                    style="background-color:#007bff;color:#ffffff;padding:10px 20px;border-radius:5px;text-decoration:none;">
                    Підтвердити зміну електронної пошти
                    </a>
                </p>
                <p style="margin: 0;">Якщо ви не ініціювали цей запит, просто проігноруйте це повідомлення.</p>
                <p style="margin: 0;">З повагою, команда Relict Arte</p>
            </div>
        """
        context = AuthTokenEmailMessageContext(
            subject="Relict Arte - Підтвердження зміни електронної пошти",
            body_message=body_message,
        )
        await self.send_email(context, token_data.owner_new_email)
