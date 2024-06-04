from enum import Enum


class UserRole(Enum):
    ADMIN = "admin"
    USER = "user"


class UserPriority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
