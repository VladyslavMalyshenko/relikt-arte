from typing import TypeVar

from ..base import BaseCustomException

from ....core.db.base import Base


ModelType = TypeVar("ModelType", bound=Base)


class FilterException(BaseCustomException):
    pass


class FilterInvalidOperatorException(FilterException):
    def __init__(self, operator: str):
        super().__init__(f"Invalid filter operator: {operator}")


class FilterLenListException(FilterException):
    def __init__(self):
        super().__init__("Filter must always have 3 elements")


class FilterInvalidColumnException(FilterException):
    def __init__(self, column: str, model: ModelType):
        super().__init__(f"Invalid column: {column} for {model.__label__}")


class FilterRangeListSizeException(FilterException):
    def __init__(self):
        super().__init__("Filter range length must be 2")


class FilterDecoderException(FilterException):
    def __init__(self):
        super().__init__("Something went wrong with filters decoding")
