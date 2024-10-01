from abc import ABC, abstractmethod

from sqlalchemy import Enum
from sqlalchemy.orm.attributes import InstrumentedAttribute

from .enums import FilterOperator
from ...exceptions.processors.filters import (
    FilterLenListException,
    FilterInvalidColumnException,
    FilterInvalidOperatorException,
    FilterRangeListSizeException,
)


class AbstractFilterProcessor(ABC):
    model = None

    @abstractmethod
    async def process_equals(self, field: str, value: str):
        raise NotImplementedError

    @abstractmethod
    async def process_range(self, field: str, range_values: list):
        raise NotImplementedError

    @abstractmethod
    async def process_value_in(self, field: str, values: list):
        raise NotImplementedError

    @abstractmethod
    async def process_value_more_than(self, field: str, value: str):
        raise NotImplementedError

    @abstractmethod
    async def process_value_less_than(self, field: str, value: str):
        raise NotImplementedError

    @abstractmethod
    async def process_value_more_than_or_equals(self, field: str, value: str):
        raise NotImplementedError

    @abstractmethod
    async def process_value_less_than_or_equals(self, field: str, value: str):
        raise NotImplementedError

    @abstractmethod
    async def process_filters(self, filters: list):
        """
        Process multiple filters

        Args:
            filters (list): list of filters
        """
        raise NotImplementedError

    @abstractmethod
    async def process_filter(self, filter_lst: list):
        """
        Process a single filter

        Args:
            filter_lst (list): filter list, e.g ["category", "in", [1, 5]]
        """
        raise NotImplementedError


class FilterProcessor(AbstractFilterProcessor):
    def __init__(self) -> None:
        super().__init__()

    async def process_equals(self, field: str, value: str):
        return [getattr(self.model, field) == value]

    async def process_range(self, field: str, range_values: list):
        if len(range_values) != 2:
            raise FilterRangeListSizeException()
        return [getattr(self.model, field).between(*range_values)]

    async def process_value_in(self, field: str, values: list):
        return [getattr(self.model, field).in_(values)]

    async def process_value_more_than(self, field: str, value: str):
        return [getattr(self.model, field) > value]

    async def process_value_less_than(self, field: str, value: str):
        return [getattr(self.model, field) < value]

    async def process_value_more_than_or_equals(self, field: str, value: str):
        return [getattr(self.model, field) >= value]

    async def process_value_less_than_or_equals(self, field: str, value: str):
        return [getattr(self.model, field) <= value]

    async def process_filters(self, filters: list):
        filters_list = []
        for filter_lst in filters:
            filters_list.extend(await self.process_filter(filter_lst))
        return filters_list

    async def __get_column_enum(self, column: str):
        column = getattr(self.model, column)
        if isinstance(column, InstrumentedAttribute) and isinstance(
            column.property.columns[0].type,
            Enum,
        ):
            return column.property.columns[0].type.enum_class
        return None

    async def process_filter(self, filter_lst: list):
        if len(filter_lst) != 3:
            raise FilterLenListException()

        column, operator, value = filter_lst

        if not hasattr(self.model, column):
            raise FilterInvalidColumnException(column, self.model)
        if operator not in FilterOperator.values():
            raise FilterInvalidOperatorException(operator)

        enum_class = await self.__get_column_enum(column)
        if enum_class:
            value = enum_class(value)

        if operator == FilterOperator.EQUALS:
            return await self.process_equals(column, value)
        elif operator == FilterOperator.RANGE:
            return await self.process_range(column, value)
        elif operator == FilterOperator.VALUE_IN:
            return await self.process_value_in(column, value)
        elif operator == FilterOperator.VALUE_MORE_THAN:
            return await self.process_value_more_than(column, value)
        elif operator == FilterOperator.VALUE_LESS_THAN:
            return await self.process_value_less_than(column, value)
        elif operator == FilterOperator.VALUE_MORE_THAN_OR_EQUALS:
            return await self.process_value_more_than_or_equals(column, value)
        elif operator == FilterOperator.VALUE_LESS_THAN_OR_EQUALS:
            return await self.process_value_less_than_or_equals(column, value)
