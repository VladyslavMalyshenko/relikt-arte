import uuid
import datetime

from typing import Optional

from fastapi import HTTPException

from pydantic import BaseModel
from pydantic import EmailStr, field_validator

from ..core.schemas import MainSchema, BaseListSchema

from ..utils.validators.user.password import validate_password
from ..utils.exceptions.user import PasswordValidationException


class BaseUserCreate(BaseModel):
    email: EmailStr
    as_admin: Optional[bool] = False
    phone: str
    password: str


class PasswordValidatorMixin:
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


class UserCreate(BaseUserCreate, PasswordValidatorMixin):
    password_confirm: str


class AdminUserCreate(BaseUserCreate):
    as_admin: Optional[bool] = True


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    new_email: Optional[EmailStr] = None


class UserShow(MainSchema):
    id: uuid.UUID
    email: EmailStr
    phone: str
    full_name: Optional[str] = None
    is_active: bool
    is_admin: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime


UserListSchema = BaseListSchema[UserShow]
