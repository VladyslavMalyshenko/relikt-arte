from ...enums import BaseEnum


class FilterOperator(BaseEnum):
    EQUALS = "="
    RANGE = "><"
    VALUE_IN = "in"
    VALUE_MORE_THAN = ">"
    VALUE_LESS_THAN = "<"
    VALUE_MORE_THAN_OR_EQUALS = ">="
    VALUE_LESS_THAN_OR_EQUALS = "<="
