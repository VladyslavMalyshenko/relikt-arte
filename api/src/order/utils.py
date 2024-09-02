import os

import binascii


def generate_basket_token() -> str:
    return binascii.hexlify(os.urandom(20)).decode()
