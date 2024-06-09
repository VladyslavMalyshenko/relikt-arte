from abc import ABC, abstractmethod


class AbstractFilterProcessor(ABC):
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
