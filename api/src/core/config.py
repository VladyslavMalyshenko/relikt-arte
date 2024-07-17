from functools import lru_cache

from pydantic import (
    Field,
    field_validator,
    ValidationInfo,
    PostgresDsn,
)
from pydantic_settings import BaseSettings

from .helpers import DotenvListHelper, load_environment


class CorsSettings(BaseSettings):
    origins: str = Field(alias="cors_origins")

    @field_validator("origins")
    @classmethod
    def assemble_cors_origins(cls, v: str) -> list[str]:
        return DotenvListHelper.get_list_from_value(v)


class DBSettings(BaseSettings):
    name: str = Field(alias="db_name")
    user: str = Field(alias="db_user")
    password: str = Field(alias="db_password")
    host: str = Field(alias="db_host")
    port: int = Field(alias="db_port")
    scheme: str = Field(alias="db_scheme")
    url: str | None = Field(alias="db_url", default=None)

    @field_validator("url")
    @classmethod
    def assemble_db_url(
        cls, v: str | None, validation_info: ValidationInfo
    ) -> str:
        if v is not None:
            return v
        values = validation_info.data
        url = PostgresDsn.build(
            scheme=values["scheme"],
            username=values["user"],
            password=values["password"],
            host=values["host"],
            port=values["port"],
            path=values["name"],
        )
        return str(url)


class CelerySettings(BaseSettings):
    timezone: str = Field(alias="celery_timezone", default="UTC")
    broker_url: str | None = Field(alias="celery_broker_url", default=None)
    result_backend: str = Field(
        alias="celery_result_backend",
        default="rpc://",
    )


class CacheSettings(BaseSettings):
    use_redis: bool = Field(alias="cache_use_redis", default=True)
    redis_url: str


class StaticFilesSettings(BaseSettings):
    directory: str = Field(alias="static_dir")
    max_file_size: int = Field(alias="static_max_file_size")
    allowed_extensions: str = Field(alias="static_upload_allowed_extensions")

    @field_validator("allowed_extensions")
    @classmethod
    def assemble_allowed_extensions(cls, v: str) -> list[str]:
        return DotenvListHelper.get_list_from_value(v)


class Settings(BaseSettings):
    # App settings
    app_name: str = "Relict Arte API"
    app_version: int = 1
    app_domain: str = "localhost:8000"
    app_scheme: str = "http"
    debug: bool = True
    secret_key: str

    # Cors
    cors: CorsSettings = Field(default_factory=CorsSettings)

    # Database settings
    db: DBSettings = Field(default_factory=DBSettings)

    # Celery
    celery: CelerySettings = Field(default_factory=CelerySettings)

    # Cache
    cache: CacheSettings = Field(default_factory=CacheSettings)

    # Static files
    static: StaticFilesSettings = Field(
        default_factory=StaticFilesSettings
    )


@lru_cache
def get_settings() -> Settings:
    load_environment()
    return Settings()


settings = get_settings()
