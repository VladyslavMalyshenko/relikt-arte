from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .core.caching import init_caching

from .utils.exception_handlers import exception_handlers

from .product.router import router as product_router


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
routers: list[APIRouter] = [product_router]
for router in routers:
    app.include_router(router, prefix=f"/api/v{settings.app_version}")


# Include custom exception handlers
for exc_cls, handler in exception_handlers():
    app.add_exception_handler(exc_cls, handler)
