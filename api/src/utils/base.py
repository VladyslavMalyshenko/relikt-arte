from typing import Any

from pydantic import BaseModel


def clean_dict(d: dict, ignore_keys: list = None):
    """
    Recursively remove None values and empty lists from the dictionary,
    except for specified keys in ignore_keys.
    """
    if ignore_keys is None:
        ignore_keys = []

    if not isinstance(d, dict):
        return d

    clean_d = {}
    for key, value in d.items():
        if key in ignore_keys:
            clean_d[key] = value
        elif isinstance(value, dict):
            nested_cleaned = clean_dict(value, ignore_keys)
            if nested_cleaned:
                clean_d[key] = nested_cleaned
        elif isinstance(value, list):
            cleaned_list = [
                clean_dict(item, ignore_keys)
                for item in value
                if item or isinstance(item, bool)
            ]
            if cleaned_list:
                clean_d[key] = cleaned_list
        elif value or isinstance(
            value, bool
        ):  # Include False but exclude None
            clean_d[key] = value
    return clean_d


def merge_dicts(
    default: dict[str, Any], updates: dict[str, Any]
) -> dict[str, Any]:
    merged = {}
    for key, default_value in default.items():
        if key in updates:
            if updates[key] is None:
                merged[key] = default_value
            elif isinstance(default_value, dict) and isinstance(
                updates[key], dict
            ):
                merged[key] = merge_dicts(default_value, updates[key])
            else:
                merged[key] = updates[key]
        else:
            merged[key] = default_value
    return merged


def model_to_dict(obj: Any) -> Any:
    if isinstance(obj, BaseModel):
        return {key: model_to_dict(value) for key, value in obj.dict().items()}
    elif isinstance(obj, list):
        return [model_to_dict(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: model_to_dict(value) for key, value in obj.items()}
    else:
        return obj
