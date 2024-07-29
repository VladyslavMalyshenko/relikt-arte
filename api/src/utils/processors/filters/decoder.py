import json
import base64

from ...exceptions.processors.filters import (
    FilterDecoderException,
)


class FiltersDecoder:
    def __init__(self, encoded_filters: str = None) -> None:
        self.encoded_filters = encoded_filters
        if self.encoded_filters:
            self.decoded_filters = self.decode_custom_encoded_filters(
                self.encoded_filters,
            )
        else:
            self.decoded_filters = None

    @staticmethod
    def decode_custom_encoded_filters(encoded_filters: str) -> dict:
        try:
            decoded_custom_encoded_filters = (
                encoded_filters.replace("_", "=")
                .replace("-", "+")
                .replace(".", "/")
            )
            decoded_filters_json = base64.urlsafe_b64decode(
                decoded_custom_encoded_filters
            ).decode()
            decoded_filters_dict = json.loads(decoded_filters_json)
            return decoded_filters_dict
        except Exception:
            FilterDecoderException()
