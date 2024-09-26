import uuid
import datetime

from typing import Optional

from fastapi import HTTPException

from pydantic import BaseModel
from pydantic import EmailStr, field_validator

from ..core.schemas import MainSchema, BaseListSchema

from ..utils.validators.user.password import validate_password
from ..utils.exceptions.user import PasswordValidationException

from .enums import AuthTokenType


class BaseUserCreate(BaseModel):
    email: EmailStr
    as_admin: Optional[bool] = False
    phone: str
    password: str


class UserCreate(BaseUserCreate):
    password_confirm: str

    @field_validator("password")
    def validate_password(cls, value):
        try:
            validate_password(value)
        except PasswordValidationException as e:
            raise HTTPException(detail=e.message, status_code=400)
        return value

    @field_validator("password_confirm")
    def validate_password_confirm(cls, value, values):
        if value != values.data.get("password"):
            raise HTTPException(status_code=400, detail="Password mismatch!")
        return value


class AdminUserCreate(BaseUserCreate):
    as_admin: Optional[bool] = True
    is_active: Optional[bool] = True


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None


class UserUpdateFromAdmin(UserUpdate):
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None


class UserChangeEmail(BaseModel):
    new_email: EmailStr


class UserPasswordReset(BaseModel):
    email: EmailStr


class UserPasswordResetConfirm(BaseModel):
    new_password: str
    new_password_confirm: str

    @field_validator("new_password")
    def validate_password(cls, value):
        try:
            validate_password(value)
        except PasswordValidationException as e:
            raise HTTPException(detail=e.message, status_code=400)
        return value

    @field_validator("new_password_confirm")
    def validate_password_confirm(cls, value, values):
        if value != values.data.get("new_password"):
            raise HTTPException(status_code=400, detail="Password mismatch!")
        return value


class UserPasswordChange(BaseModel):
    old_password: str
    new_password: str
    new_password_confirm: str

    @field_validator("new_password")
    def validate_password(cls, value):
        try:
            validate_password(value)
        except PasswordValidationException as e:
            raise HTTPException(detail=e.message, status_code=400)
        return value

    @field_validator("new_password_confirm")
    def validate_password_confirm(cls, value, values):
        if value != values.data.get("new_password"):
            raise HTTPException(status_code=400, detail="Password mismatch!")
        return value


class UserShow(MainSchema):
    id: uuid.UUID
    email: EmailStr
    phone: str
    full_name: Optional[str] = None
    is_active: bool
    is_admin: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime


class AuthTokenCreate(BaseModel):
    token: Optional[str] = None
    token_type: AuthTokenType
    owner_email: EmailStr
    owner_new_email: Optional[EmailStr] = None


class AuthTokenUpdate(AuthTokenCreate):
    pass


class AuthTokenShow(MainSchema):
    id: int
    token: str
    token_type: AuthTokenType
    owner_email: EmailStr
    expires_at: datetime.datetime
    created_at: datetime.datetime
    updated_at: datetime.datetime


class UserAuth(BaseModel):
    email: EmailStr
    password: str


class JWTTokensSchema(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: Optional[str] = None


class TokenVerifyOrRefreshSchema(BaseModel):
    token: str


UserListSchema = BaseListSchema[UserShow]
