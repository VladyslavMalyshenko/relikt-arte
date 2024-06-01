from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.backends.inmemory import InMemoryBackend

from redis import asyncio as aioredis

from .config import settings


def init_caching():
    """
    Initialize the cache backend.
    """
    if settings.cache.use_redis:
        redis = aioredis.from_url(settings.cache.redis_url)
        caching_backend = RedisBackend(redis)
    else:
        caching_backend = InMemoryBackend()
    FastAPICache.init(caching_backend, prefix="fastapi-cache")
