from abc import ABC
from abc import abstractmethod

from sqlalchemy.ext.asyncio import AsyncSession

from ..db.session import create_async_session_maker

from ...repositories.product import (
    ProductRepository,
    ProductPhotoRepository,
    CategoryRepository,
    ProductSizeRepository,
    ProductColorRepository,
    ProductCoveringRepository,
    ProductGlassColorRepository,
)


class AbstractUnitOfWork(ABC):
    product: ProductRepository
    product_photo: ProductPhotoRepository
    category: CategoryRepository
    product_size: ProductSizeRepository
    product_color: ProductColorRepository
    product_covering: ProductCoveringRepository
    product_glass_color: ProductGlassColorRepository

    @abstractmethod
    async def __aenter__(self):
        raise NotImplementedError()

    @abstractmethod
    async def __aexit__(self, *args):
        raise NotImplementedError()

    @abstractmethod
    async def commit(self):
        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        raise NotImplementedError()

    @abstractmethod
    async def add(self, instance):
        raise NotImplementedError()

    @abstractmethod
    async def add_all(self, instances):
        raise NotImplementedError()


class UnitOfWork(AbstractUnitOfWork):
    def __init__(self) -> None:
        self.session_factory = create_async_session_maker()

    async def __aenter__(self):
        self.session: AsyncSession = self.session_factory()

        # Product and related
        self.product = ProductRepository(self.session)
        self.product_photo = ProductPhotoRepository(self.session)
        self.product_size = ProductSizeRepository(self.session)
        self.product_color = ProductColorRepository(self.session)
        self.product_covering = ProductCoveringRepository(self.session)
        self.product_glass_color = ProductGlassColorRepository(self.session)

        # Category
        self.category = CategoryRepository(self.session)

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()

    async def add(self, instance):
        self.session.add(instance)

    async def add_all(self, instances):
        self.session.add_all(instances)
