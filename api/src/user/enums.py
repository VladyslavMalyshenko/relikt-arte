from ..utils.enums import BaseEnum


class UserRole(BaseEnum):
    ADMIN = "admin"
    CUSTOMER = "customer"


class AuthTokenType(BaseEnum):
    REGISTRATION_CONFIRM = "registration_confirm"
    PASSWORD_RESET = "password_reset"
    EMAIL_CHANGE_CONFIRM = "email_change_confirm"
