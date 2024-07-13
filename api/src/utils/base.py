def clean_dict(d: dict):
    """Recursively remove None values and empty lists from the dictionary."""
    if not isinstance(d, dict):
        return d

    clean_d = {}
    for key, value in d.items():
        if isinstance(value, dict):
            nested_cleaned = clean_dict(value)
            if nested_cleaned:
                clean_d[key] = nested_cleaned
        elif isinstance(value, list):
            cleaned_list = [
                clean_dict(item)
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
