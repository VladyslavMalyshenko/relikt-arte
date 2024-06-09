import json


def _default_product_description_json() -> str:
    """
    Default JSON for product description.

    Example:
    {
        "construction": {
            "main_text": "Main text",
            "additional_text": "Additional text",
        },
        "advantages": ["Advantage 1", "Advantage 2"],
        "finishing": {
            "covering": {
                "text": "Text",
                "advantages": ["Advantage 1", "Advantage 2"],
            }
        },
        "text": "Text",
    }
    """
    default_dict = {
        "construction": {
            "main_text": None,
            "additional_text": None,
        },
        "advantages": [],
        "finishing": {
            "covering": {
                "text": None,
                "advantages": [],
            }
        },
        "text": None,
    }
    return json.dumps(default_dict)
