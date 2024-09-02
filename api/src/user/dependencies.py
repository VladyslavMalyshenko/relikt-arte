from typing import Annotated

from fastapi import Depends, Header


def get_authorization(
    authorization: str | None = Header(
        default=None,
        alias="Authorization",
    )
):
    return authorization


authorization = Annotated[str | None, Depends(get_authorization)]
