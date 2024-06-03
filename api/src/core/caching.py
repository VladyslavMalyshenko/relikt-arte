import redis_cli
import hashlib
import asyncio
import functools
import pickle

from typing import Any, Optional, Callable

from .config import settings


class RedisCaching:
    def __init__(self) -> None:
        self.redis = redis_cli.get_redis()

    @classmethod
    def init(cls):
        redis_cli.init_from_url(settings.cache.redis_url)

    @classmethod
    def get_cache_key(
        cls,
        func: Callable,
        namespace: str = "",
        prefix: str = "",
    ) -> str:
        """
        Generates a hashed cache key based on the
        function name, prefix and namespace.
        """
        prefix = f"{prefix}:{namespace}:"
        cache_key = (
            prefix
            + hashlib.md5(
                f"{func.__module__}:{func.__name__}".encode()
            ).hexdigest()
        )
        return cache_key

    async def _get_processed_value(self, value: Any) -> Any:
        return pickle.loads(value) if value else None

    async def get(self, key: str) -> Optional[Any]:
        value = self.redis.get(key)
        return await self._get_processed_value(value)

    async def set(
        self,
        key: str,
        value: Any,
        expire: Optional[int] = 15,
    ) -> None:
        value = pickle.dumps(value)
        if expire:
            self.redis.setex(key, expire, value)
        else:
            self.redis.set(key, value)


def init_caching():
    """Initialize the cache backend."""
    RedisCaching.init()


def cache(
    expire: int = 60,
    namespace: str = "",
    prefix: str = "",
) -> Callable:
    """
    Cache decorator to cache the result of the function.
    Works with both async and sync functions.
    """

    def wrapper(func: Callable) -> Callable:
        @functools.wraps(func)
        async def inner(*args, **kwargs) -> Any:
            redis_caching = RedisCaching()
            cache_key = RedisCaching.get_cache_key(func, namespace, prefix)

            cached_value = await redis_caching.get(cache_key)
            if cached_value:
                return cached_value

            if asyncio.iscoroutinefunction(func):
                res = await func(*args, **kwargs)
            else:
                res = func(*args, **kwargs)

            await redis_caching.set(cache_key, res, expire)
            return res

        return inner

    return wrapper
