import re

from ...exceptions.user import (
    PasswordLengthException,
    PasswordLowercaseException,
    PasswordNumbersException,
    PasswordUppercaseException,
)


class PasswordValidationException(Exception):
    def __init__(self, error: str) -> None:
        self.error = error


class PasswordValidator:

    def __init__(self, value: str):
        self.password = value

    def check_lowercase(self):
        if not re.search("[a-z]", self.password):
            raise PasswordLowercaseException(
                "Пароль повинен містити принаймні одну малу літеру."
            )

    def check_uppercase(self):
        if not re.search("[A-Z]", self.password):
            raise PasswordUppercaseException(
                "Пароль повинен містити принаймні одну велику літеру."
            )

    def check_numbers(self):
        if not re.search("[0-9]", self.password):
            raise PasswordNumbersException(
                "Пароль повинен містити принаймні одну цифру."
            )

    def check_length(self):
        if len(self.password) < 9:
            raise PasswordLengthException(
                "Пароль повинен містити не менше 9 символів."
            )

    def check_all(self):
        self.check_lowercase()
        self.check_uppercase()
        self.check_numbers()
        self.check_length()

    def validate_password(self):
        self.check_all()


def validate_password(password: str):
    validator = PasswordValidator(value=password)
    validator.validate_password()
