from uuid import UUID  # noqa: F401
from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..user.models import User, AuthToken
from ..user.enums import UserRole
from ..user.schemas import (
    UserCreate,
    AdminUserCreate,
    UserUpdate,
    AuthTokenCreate,
    AuthTokenUpdate,
)


class UserRepository(GenericRepository[User, UserCreate, UserUpdate]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, User)

    async def create(
        self,
        *,
        obj_in: UserCreate | AdminUserCreate,
    ) -> User:
        user = User(
            email=obj_in.email,
            phone=obj_in.phone,
            password=obj_in.password,
            role=UserRole.ADMIN if obj_in.as_admin else UserRole.CUSTOMER,
        )
        return user

    async def exists_by_email(self, email: str) -> bool:
        return await self.exists_by_attr(attr=self.model.email, value=email)


class AuthTokenRepository(
    GenericRepository[AuthToken, AuthTokenCreate, AuthTokenUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, AuthToken)

    async def exists_by_token(self, token: str) -> bool:
        return await self.exists_by_attr(attr=self.model.token, value=token)
