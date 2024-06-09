import uuid

from sqlalchemy.orm import as_declarative, declared_attr


@as_declarative()
class Base:
    id: uuid.UUID | int
    table_name = None
    __label__ = None

    @declared_attr
    def __tablename__(cls) -> str:
        if cls.table_name:
            return cls.table_name
        return cls.__name__.lower()
