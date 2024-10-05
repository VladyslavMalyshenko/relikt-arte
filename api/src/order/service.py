import logging
import csv

from io import StringIO

from sqlalchemy.exc import SQLAlchemyError

from typing import Optional

from ..core.dependencies import PaginationParams
from ..core.db.service import BaseService
from ..user.service import UserService
from ..product.service import ProductService

from ..utils.processors.filters.decoder import FiltersDecoder
from ..utils.processors.filters.order import OrderFilterProcessor

from ..utils.exceptions.http.user import (
    InvalidCredentialsException,
    UserNotFoundByIdException,
)
from ..utils.exceptions.http.order import (
    BasketGetException,
    BasketItemAddException,
    BasketItemUpdateException,
    BasketItemRemoveException,
    OrderCreateException,
    OrderUpdateException,
    OrderGetException,
    OrderDeleteException,
)

from .models import Basket, Order
from .schemas import (
    BasketShow,
    BasketCreate,
    BasketItemList,
    BasketItemShow,
    BasketItemCreate,
    BasketItemUpdate,
    OrderCreate,
    OrderShow,
    OrderItemShow,
    OrderItemList,
    OrderUpdate,
    OrderListSchema,
)
from .utils import generate_basket_token


log = logging.getLogger(__name__)


class BasketService(BaseService):
    async def get_show_scheme(self, obj: Basket) -> BasketShow:
        return BasketShow(
            id=obj.id,
            user_id=obj.user_id,
            basket_token=obj.basket_token,
            total_value=obj.total_value,
            total_items=obj.total_items,
            items=BasketItemList(
                objects_count=obj.total_items,
                results=[
                    BasketItemShow(
                        id=item.id,
                        product_id=item.product_id,
                        color_id=item.color_id,
                        size_id=item.size_id,
                        covering_id=item.covering_id,
                        glass_color_id=item.glass_color_id,
                        material=item.material,
                        type_of_platband=item.type_of_platband,
                        orientation=item.orientation,
                        with_glass=item.with_glass,
                        quantity=item.quantity,
                        total_price=item.total_price,
                        product=await ProductService(self.uow).get_show_scheme(
                            item.product,
                        ),
                    )
                    for item in obj.items
                ],
            ),
        )

    async def get_basket(
        self,
        authorization: str | None = None,
        basket_token: str = None,
    ) -> BasketShow:
        try:
            async with self.uow:
                basket = None
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    basket = await self.uow.basket.get_by_user_id(user.id)
                    if not basket:
                        basket_id = await self.uow.basket.create(
                            obj_in=BasketCreate(
                                user_id=user.id,
                                basket_token=generate_basket_token(),
                            )
                        )
                else:
                    if basket_token:
                        basket = await self.uow.basket.get_by_token(
                            token=basket_token
                        )
                    else:
                        basket_id = await self.uow.basket.create(
                            obj_in=BasketCreate(
                                basket_token=generate_basket_token(),
                            )
                        )
                await self.uow.commit()
                if not basket:
                    basket = await self.uow.basket.get_by_id(obj_id=basket_id)
                return await self.get_show_scheme(basket)
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketGetException()

    async def add_item(
        self,
        item_data: BasketItemCreate,
        authorization: str | None = None,
        basket_token: str | None = None,
    ) -> BasketShow:
        try:
            async with self.uow:
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    basket = await self.uow.basket.get_by_user_id(user.id)
                else:
                    basket = await self.uow.basket.get_by_token(
                        token=basket_token
                    )
                if not basket:
                    raise BasketGetException()
                item_data.basket_id = basket.id
                product = await self.uow.product.get_by_id(
                    obj_id=item_data.product_id
                )
                if not product:
                    raise BasketItemAddException(
                        product_id=item_data.product_id
                    )
                if await self.uow.basket_item.exists_by_attrs(
                    attrs={
                        self.uow.basket_item.model.product_id: item_data.product_id,
                        self.uow.basket_item.model.basket_id: basket.id,
                    }
                ):
                    basket_item = await self.uow.basket_item.get_by_attrs(
                        {
                            self.uow.basket_item.model.product_id: item_data.product_id,
                            self.uow.basket_item.model.basket_id: basket.id,
                        }
                    )
                    basket_item.quantity += (
                        item_data.quantity if item_data.quantity else 1
                    )
                else:
                    await self.uow.basket_item.create(obj_in=item_data)
                await self.uow.commit()
                return await self.get_show_scheme(basket)
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketItemAddException(product_id=item_data.product_id)

    async def update_item(
        self,
        item_data: BasketItemUpdate,
        item_id: int,
        authorization: str | None = None,
        basket_token: str | None = None,
    ):
        try:
            async with self.uow:
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    basket = await self.uow.basket.get_by_user_id(user.id)
                else:
                    basket = await self.uow.basket.get_by_token(
                        token=basket_token
                    )
                if not basket:
                    raise BasketGetException()
                item = await self.uow.basket_item.get_by_id(obj_id=item_id)
                if not item:
                    raise BasketItemUpdateException(item_id=item_id)
                await self.uow.basket_item.update(
                    obj_in=item_data, obj_id=item.id
                )
                await self.uow.commit()
                return await self.get_show_scheme(basket)
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketItemUpdateException(item_id=item_data.product_id)

    async def remove_item(
        self,
        item_id: int,
    ):
        try:
            async with self.uow:
                item = await self.uow.basket_item.get_by_id(obj_id=item_id)
                if not item:
                    raise BasketItemRemoveException(item_id=item_id)
                await self.uow.basket_item.delete_by_id(obj_id=item_id)
                await self.uow.commit()
                return True
        except SQLAlchemyError as e:
            log.exception(e)
            raise BasketItemRemoveException(item_id=item_id)


class OrderService(BaseService):
    filter_processor = OrderFilterProcessor
    list_schema = OrderListSchema

    async def get_show_scheme(self, obj: Order) -> OrderShow:
        return OrderShow(
            id=obj.id,
            user_id=obj.user_id,
            full_name=obj.full_name,
            phone=obj.phone,
            email=obj.email,
            region=obj.region,
            city_or_settlement=obj.city_or_settlement,
            warehouse=obj.warehouse,
            items=OrderItemList(
                objects_count=obj.total_items,
                results=[
                    OrderItemShow(
                        id=item.id,
                        product_id=item.product_id,
                        color_id=item.color_id,
                        size_id=item.size_id,
                        covering_id=item.covering_id,
                        glass_color_id=item.glass_color_id,
                        material=item.material,
                        type_of_platband=item.type_of_platband,
                        orientation=item.orientation,
                        with_glass=item.with_glass,
                        quantity=item.quantity,
                        total_price=item.total_price,
                        product=await ProductService(self.uow).get_show_scheme(
                            item.product,
                        ),
                    )
                    for item in obj.items
                ],
            ),
            created_at=obj.created_at,
            updated_at=obj.updated_at,
            total_items=obj.total_items,
            total_value=obj.total_value,
            additional_info=obj.additional_info,
            status=obj.status,
        )

    async def create_order(
        self,
        data: OrderCreate,
        authorization: str | None = None,
        basket_token: str | None = None,
    ):
        try:
            async with self.uow:
                order = await self.uow.order.create(obj_in=data)
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    order.user_id = user.id
                    basket = await self.uow.basket.get_by_user_id(user.id)
                else:
                    basket = await self.uow.basket.get_by_token(
                        token=basket_token
                    )
                if not basket:
                    raise BasketGetException()
                basket.clear()
                await self.uow.add_all([order, basket])
                await self.uow.flush()

                for item_data in data.items:
                    order_item = await self.uow.order_item.create(
                        obj_in=item_data,
                        order_id=order.id,
                    )
                    await self.uow.add(order_item)
                await self.uow.commit()
                order = await self.uow.order.get_by_id(obj_id=order.id)
                return await self.get_show_scheme(order)
        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderCreateException()

    async def get_order(self, order_id: int):
        try:
            async with self.uow:
                order = await self.uow.order.get_by_id(obj_id=order_id)
                if not order:
                    raise OrderGetException(order_id=order_id)
                return await self.get_show_scheme(order)
        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderGetException(order_id=order_id)

    async def update_order(
        self,
        order_id: int,
        data: OrderUpdate,
    ):
        try:
            async with self.uow:
                return await self.update_obj(
                    repo=self.uow.order,
                    data=data,
                    obj_id=order_id,
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderUpdateException(order_id=order_id)

    async def delete_order(
        self,
        order_id: int,
    ) -> bool:
        try:
            async with self.uow:
                await self.uow.order.delete_by_id(obj_id=order_id)
                await self.uow.commit()
                return True
        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderDeleteException(order_id=order_id)

    async def get_order_list(
        self,
        pagination: Optional[PaginationParams] = None,
        filters_decoder: Optional[FiltersDecoder] = None,
    ) -> OrderListSchema | list[OrderShow]:
        try:
            async with self.uow:
                return await self.get_obj_list(
                    repo=self.uow.order,
                    options=await self.uow.order._add_default_options(),
                    pagination_params=pagination,
                    filters_decoder=filters_decoder,
                )
        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderGetException(order_id=1)

    async def get_orders_for_user(
        self,
        authorization: str,
        pagination: Optional[PaginationParams] = None,
        filters_decoder: Optional[FiltersDecoder] = None,
    ) -> OrderListSchema | list[OrderShow]:
        try:
            async with self.uow:
                if authorization:
                    user_id = await UserService(self.uow)._user_id_from_jwt(
                        authorization
                    )
                    if not user_id:
                        raise InvalidCredentialsException()
                    user = await self.uow.user.get_by_id(obj_id=user_id)
                    if not user:
                        raise UserNotFoundByIdException()
                    return await self.get_obj_list(
                        repo=self.uow.order,
                        options=await self.uow.order._add_default_options(),
                        pagination_params=pagination,
                        filters_decoder=filters_decoder,
                        filters=[self.uow.order.model.user_id == user.id],
                    )
                else:
                    raise InvalidCredentialsException()
        except SQLAlchemyError as e:
            log.exception(e)
            raise InvalidCredentialsException()

    async def get_order_in_csv(self, order_id: int):
        try:
            async with self.uow:
                order = await self.uow.order.get_by_id(obj_id=order_id)

                output = StringIO()
                writer = csv.writer(output)

                writer.writerow(["Інформація про замовлення"])
                writer.writerow(
                    [
                        "ПІБ",
                        "Телефон",
                        "Електронна пошта",
                        "Регіон",
                        "Місто",
                        "Відділення",
                        "Додаткова інформація",
                        "Статус",
                    ]
                )
                if order.status == "new":
                    order_status = "Нове"
                elif order.status == "accepted":
                    order_status = "Приняте"
                else:
                    order_status = "Готове до відправлення"
                writer.writerow(
                    [
                        order.full_name,
                        order.phone,
                        order.email,
                        order.region,
                        order.city_or_settlement,
                        order.warehouse,
                        order.additional_info,
                        order_status,
                    ]
                )

                writer.writerow([])

                writer.writerow(["Товари в замовленні"])
                headers = [
                    "Назва товару",
                    "SKU",
                    "Ціна",
                    "Кількість",
                    "Загальна ціна",
                ]

                if any(item.material for item in order.items):
                    headers.append("Матеріал")
                if any(item.type_of_platband for item in order.items):
                    headers.append("Тип плінтуса")
                if any(item.orientation for item in order.items):
                    headers.append("Орієнтація")
                if any(item.with_glass is not None for item in order.items):
                    headers.append("З склом")
                headers.extend(
                    [
                        "Колір",
                        "Колір скла",
                        "Покриття",
                        "Розмір",
                        "URL фотографій",
                    ]
                )
                writer.writerow(headers)

                for item in order.items:
                    product = item.product

                    photos = [photo.photo for photo in product.photos]
                    photo_urls = ", ".join(photos)

                    row = [
                        product.name,
                        product.sku,
                        product.price,
                        item.quantity,
                        item.total_price,
                    ]

                    if item.material:
                        row.append(
                            "Дерево" if item.material == "wood" else "МДФ"
                        )
                    if item.type_of_platband:
                        row.append(
                            "Г-подібний"
                            if item.type_of_platband == "L-shaped"
                            else "Звичайний"
                        )
                    if item.orientation:
                        row.append(
                            "Ліва" if item.orientation == "left" else "Права"
                        )
                    if item.with_glass is not None:
                        row.append("Так" if item.with_glass else "Ні")
                    row.extend(
                        [
                            item.color.name,
                            (
                                item.glass_color.name
                                if item.glass_color
                                else "Н/Д"
                            ),
                            item.covering.name if item.covering else "Н/Д",
                            item.size.dimensions if item.size else "Н/Д",
                            photo_urls,
                        ]
                    )
                    writer.writerow(row)

                return output.getvalue()

        except SQLAlchemyError as e:
            log.exception(e)
            raise OrderGetException(order_id=order_id)
