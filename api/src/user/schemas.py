from typing import Optional

from fastapi import HTTPException

from pydantic import EmailStr, field_validator

from ..core.schemas import MainSchema

from ..utils.validators.user.password import validate_password
from ..utils.exceptions.user import PasswordValidationException


class UserCreate(MainSchema):
    email: EmailStr
    phone: str
    password: str
    password_confirm: str

    @field_validator("password")
    def validate_password(cls, value):
        try:
            validate_password(value)
        except PasswordValidationException as e:
            raise HTTPException(detail=e, status_code=400)

    @field_validator("password_confirm")
    def validate_password_confirm(cls, value, values):
        if value != values.data.get("password"):
            raise HTTPException(status_code=400, detail="Password mismatch!")
        return value


class UserUpdate(MainSchema):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    new_email: Optional[EmailStr] = None
