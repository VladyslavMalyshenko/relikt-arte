from typing import Any

from enum import Enum


class BaseEnum(Enum):
    @classmethod
    def values(cls):
        return list(map(lambda c: c.value, cls))

    def __hash__(self) -> int:
        return hash(self.value)

    def __eq__(self, value: Any) -> bool:
        return value == self.value
