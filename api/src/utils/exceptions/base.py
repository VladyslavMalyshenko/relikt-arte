class BaseCustomException(Exception):
    error = None

    def __init__(self, message: str | None = None):
        if not message:
            message = self.error
        self.message = message
        super().__init__(message)
