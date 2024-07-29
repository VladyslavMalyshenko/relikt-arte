import json
import base64

# Step 1: Original JSON string
ts = """
[
    ["name", "=", "asdasdas"]
]
"""

# Step 2: Convert JSON string to dictionary
filters_dict = json.loads(ts)

# Step 3: Convert dictionary to JSON string
filters_json = json.dumps(filters_dict)

# Step 4: Encode JSON string to base64
filters_base64 = base64.urlsafe_b64encode(filters_json.encode()).decode()

# Step 5: Custom replacements to avoid JWT look
custom_encoded_filters = (
    filters_base64.replace("=", "_").replace("+", "-").replace("/", ".")
)

# Now you can use `custom_encoded_filters` as a query parameter
print("Encoded filters for URL:", custom_encoded_filters)

# Step 1: Custom replacements back to original
# decoded_custom_encoded_filters = (
#     "W1sicHJpY2UiLCAiPjwiLCBbNTAwMCwgMTAwMDBdXV0_".replace(
#         "_", "="
#     )
#     .replace("-", "+")
#     .replace(".", "/")
# )

# # Step 2: Decode base64 string
# decoded_filters_json = base64.urlsafe_b64decode(
#     decoded_custom_encoded_filters
# ).decode()

# # Step 3: Convert JSON string to dictionary
# decoded_filters_dict = json.loads(decoded_filters_json)

# # Verify the result
# print("Decoded filters dictionary:", decoded_filters_dict)
