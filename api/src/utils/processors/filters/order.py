from .base import FilterProcessor

from ....order.models import Order


class OrderFilterProcessor(FilterProcessor):
    model = Order
