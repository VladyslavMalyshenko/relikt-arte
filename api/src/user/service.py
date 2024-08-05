import logging

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService

from ..utils.exceptions.user import UserByEmailAlreadyExistsException
from ..utils.exceptions.http.base import (  # noqa: F401
    ObjectCreateException,
    ObjectUpdateException,
)

from ..utils.token import generate_token

from .models import User, AuthToken
from .schemas import (
    UserCreate,
    AdminUserCreate,
    UserShow,
    UserListSchema,
    AuthTokenCreate,
    AuthTokenShow,
)
from .enums import AuthTokenType
from .utils import AuthTokenEmailManager


log = logging.getLogger(__name__)


class AuthTokenService(BaseService):
    async def get_show_scheme(self, obj: AuthToken) -> UserShow:
        return AuthTokenShow(
            id=obj.id,
            token=obj.token,
            token_type=obj.type,
            owner_email=obj.owner_email,
            expires_at=obj.expires_at,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

    async def create_auth_token(self, data: AuthTokenCreate) -> AuthTokenShow:
        try:
            while await self.uow.auth_token.exists_by_token(data.token):
                data.token = generate_token()
            token_id = await self.uow.auth_token.create(obj_in=data)
            token = await self.uow.auth_token.get_by_id(obj_id=token_id)
            return await self.get_show_scheme(token)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException("Auth token")


class UserService(BaseService):
    list_schema = UserListSchema

    async def get_show_scheme(self, obj: User) -> UserShow:
        return UserShow(
            id=obj.id,
            email=obj.email,
            phone=obj.phone,
            full_name=obj.full_name,
            is_active=obj.is_active,
            is_admin=obj.is_admin,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
        )

    async def create_user(
        self,
        data: UserCreate | AdminUserCreate,
        send_confirmation_email: bool = True,
    ) -> UserShow:
        try:
            async with self.uow:
                if await self.uow.user.exists_by_email(data.email):
                    raise UserByEmailAlreadyExistsException()
                user = await self.uow.user.create(obj_in=data)
                await self.uow.add(user)
                if send_confirmation_email:
                    # Send confirmation email
                    token_data = await AuthTokenService(
                        self.uow
                    ).create_auth_token(
                        AuthTokenCreate(
                            token_type=AuthTokenType.REGISTRATION_CONFIRM,
                            owner_email=user.email,
                        )
                    )
                    await AuthTokenEmailManager().send_registration_confirmation(
                        token_data
                    )
                await self.uow.commit()
                return await self.get_show_scheme(user)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException("User")
