from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from sqladmin import Admin

from .core.config import settings
from .core.caching import init_caching
from .core.db.session import (
    get_async_engine,
    create_async_session_maker,
)

from .admin.model_views import get_model_views


# Lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa
    # Initialize the cache backend
    init_caching()
    yield


# App configuration
app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    version=str(settings.app_version),
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
routers: list[APIRouter] = []
for router in routers:
    app.include_router(router, prefix=f"/api/v{settings.app_version}")


# Admin panel
admin = Admin(
    app,
    engine=get_async_engine(),
    session_maker=create_async_session_maker(),
    title=settings.app_name,
)
for model_view in get_model_views():
    admin.add_view(model_view)
