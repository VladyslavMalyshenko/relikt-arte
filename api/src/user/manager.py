from .enums import AuthTokenType

from .schemas import AuthTokenShow


class AuthTokenEmailManager:
    async def send_registration_confirmation(self, token_data: AuthTokenShow):
        pass
