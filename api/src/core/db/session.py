from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    create_async_engine,
    async_sessionmaker,
)

from ..config import settings


def get_async_engine() -> AsyncEngine:
    return create_async_engine(
        settings.db.url,
        echo=True if settings.debug else False,
        future=True,
        pool_pre_ping=True,
        pool_size=1000,
        max_overflow=150,
    )


def create_async_session_maker() -> async_sessionmaker:
    engine: AsyncEngine = get_async_engine()
    return async_sessionmaker(engine, autoflush=False, expire_on_commit=False)
