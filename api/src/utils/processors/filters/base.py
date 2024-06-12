import json
import logging
import base64


logger = logging.getLogger(__name__)


class BaseFilterProcessor:
    def decode_filters(self, filters_token: str) -> dict | None:
        try:
            decoded_filters = (
                filters_token.replace("_", "=")
                .replace("-", "+")
                .replace(".", "/")
            )
            decoded_filters_json = base64.urlsafe_b64decode(
                decoded_filters
            ).decode()
            return json.loads(decoded_filters_json)
        except Exception as e:
            logger.exception(e)
            return None


bfp = BaseFilterProcessor()
print(
    bfp.decode_filters(
        "W1siQVNEQVNEQVNEQVNEQVNEIiwiaXMiLDNdLFtudWxsLCJjdW0iLCJzZXh5Il0sWyJhc3MiLCJwdXQgaW4iLCJkaWNrIl1d"
    )
)
