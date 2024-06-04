from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..user.models import User
from ..user.schemas import UserCreate, UserUpdate


class UserRepository(GenericRepository[User, UserCreate, UserUpdate]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, User)
