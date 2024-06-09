from typing import Any

from enum import Enum


class BaseEnum(Enum):
    def __eq__(self, value: Any) -> bool:
        return value == self.value

    @classmethod
    def values(cls):
        return list(map(lambda c: c.value, cls))
