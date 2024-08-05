from dataclasses import dataclass


@dataclass
class AuthTokenEmailMessageContext:
    subject: str
    body_message: str
