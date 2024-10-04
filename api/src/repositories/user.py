from uuid import UUID  # noqa: F401

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update

from .generic import GenericRepository

from ..user.models import User, AuthToken
from ..user.enums import UserRole
from ..user.schemas import (
    UserCreate,
    AdminUserCreate,
    UserUpdate,
    UserUpdateFromAdmin,
    AuthTokenCreate,
    AuthTokenUpdate,
)


class UserRepository(GenericRepository[User, UserCreate, UserUpdate]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, User)

    async def get_by_email(self, email: str) -> User:
        return await self.get_by_attr(attr=self.model.email, value=email)

    async def create(
        self,
        *,
        obj_in: UserCreate | AdminUserCreate,
    ) -> User:
        user = User(
            email=obj_in.email,
            phone=obj_in.phone,
            password=obj_in.password,
            is_active=obj_in.is_active,
            role=UserRole.ADMIN if obj_in.as_admin else UserRole.CUSTOMER,
        )
        return user

    async def update(
        self,
        *,
        obj_in: UserUpdate | UserUpdateFromAdmin,
        obj_id: int | UUID,
        clean_dict_ignore_keys: list | None = None,
        **kwargs,
    ) -> int | UUID:
        if isinstance(obj_in, UserUpdateFromAdmin) and obj_in.is_admin is not None:
            user_role = UserRole.ADMIN if obj_in.is_admin else UserRole.CUSTOMER
            obj_in = dict(obj_in)
            obj_in["role"] = user_role
            del obj_in["is_admin"]
        stmt = (
            update(self.model)
            .where(self.model.id == obj_id)
            .values(
                **self.clean_dict(
                    dict(obj_in),
                    ignore_keys=clean_dict_ignore_keys,
                )
            )
            .returning(self.model.id)
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def exists_by_email(self, email: str) -> bool:
        return await self.exists_by_attr(attr=self.model.email, value=email)


class AuthTokenRepository(
    GenericRepository[AuthToken, AuthTokenCreate, AuthTokenUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, AuthToken)

    async def get_by_token(self, token: str) -> AuthToken:
        return await self.get_by_attr(attr=self.model.token, value=token)

    async def exists_by_token(self, token: str) -> bool:
        return await self.exists_by_attr(attr=self.model.token, value=token)
