from ..base import BaseCustomException


class FilterException(BaseCustomException):
    pass


class InvalidFilterOperatorException(FilterException):
    def __init__(self, operator: str):
        super().__init__(f"Invalid filter operator: {operator}")
