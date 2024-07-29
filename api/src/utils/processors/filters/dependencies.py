from typing import Annotated

from fastapi import Depends

from .decoder import FiltersDecoder


def get_decoded_filters(
    decoded_filters: FiltersDecoder = Depends(),
):
    return decoded_filters


filters_decoder = Annotated[FiltersDecoder, Depends(get_decoded_filters)]
