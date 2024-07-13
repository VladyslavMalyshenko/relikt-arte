from .base import BaseCustomException


class GetRepoByAttrNameException(BaseCustomException):
    def __init__(self, label: str):
        super().__init__(f"Failed to get repo by attr name: {label}")
