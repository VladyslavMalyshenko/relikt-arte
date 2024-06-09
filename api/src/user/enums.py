from ..utils.enums import BaseEnum


class UserRole(BaseEnum):
    ADMIN = "admin"
    USER = "user"


class UserPriority(BaseEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
