from dataclasses import dataclass


@dataclass
class EmailMessageContext:
    subject: str
    body_message: str
