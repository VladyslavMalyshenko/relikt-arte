from .base import FilterProcessor

from ....user.models import User


class UserFilterProcessor(FilterProcessor):
    model = User
