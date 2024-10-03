import uuid

from pydantic import BaseModel


class LetterSendSchema(BaseModel):
    subject: str
    body: str
    recipients_ids: list[uuid.UUID]
