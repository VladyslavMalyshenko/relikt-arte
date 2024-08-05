from dataclasses import dataclass


@dataclass
class AuthTokenEmailMessageContext:
    title: str
    message: str
