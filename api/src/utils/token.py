import os
import binascii


def generate_token() -> str:
    return binascii.hexlify(os.urandom(20)).decode()