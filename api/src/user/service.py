import logging

from sqlalchemy.exc import SQLAlchemyError

from ..core.db.service import BaseService

from ..utils.exceptions.user import UserByEmailAlreadyExistsException

from ..utils.exceptions.http.base import (  # noqa: F401
    ObjectCreateException,
    ObjectUpdateException,
)

from .models import User
from .schemas import UserCreate, AdminUserCreate, UserShow, UserListSchema


log = logging.getLogger(__name__)


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

    async def create_user(self, data: UserCreate | AdminUserCreate) -> UserShow:
        try:
            async with self.uow:
                if await self.uow.user.exists_by_email(data.email):
                    raise UserByEmailAlreadyExistsException()
                user = await self.uow.user.create(obj_in=data)
                await self.uow.add(user)
                await self.uow.commit()
                return await self.get_show_scheme(user)
        except SQLAlchemyError as e:
            log.exception(e)
            raise ObjectCreateException("User")
