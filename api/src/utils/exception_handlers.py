from typing import Any, Callable, Generator

from fastapi import status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


class ExceptionJsonResponseConstructor:
    def __init__(self, default_status_code: int):
        self.default_status_code = default_status_code

    def __call__(self, content: dict, status_code: int = None) -> JSONResponse:
        return JSONResponse(
            status_code=(
                status_code if status_code else self.default_status_code
            ),
            content=content,
        )


exception_json_response_constructor = ExceptionJsonResponseConstructor(
    status.HTTP_400_BAD_REQUEST
)


def fastapi_request_validation_exception_handler(
    request, exc: RequestValidationError
):
    errors_list = []
    for error_dict in exc.errors():
        error_data = {
            "input": error_dict["input"],
            "loc": error_dict["loc"],
            "msg": error_dict["msg"],
            "type": error_dict["type"],
        }
        if error_dict.get("ctx"):
            error_data["expected"] = error_dict["ctx"]["expected"]
        errors_list.append(error_data)
    return exception_json_response_constructor({"errors": errors_list})


def exception_handlers() -> (
    Generator[tuple[type[Exception], Callable], None, Any]
):
    mapping = {
        RequestValidationError: fastapi_request_validation_exception_handler,
    }

    for exc_cls, handler in mapping.items():
        yield exc_cls, handler
