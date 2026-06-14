from functools import lru_cache

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = Field(default="Hiring Journey API", alias="APP_NAME")
    app_env: str = Field(default="development", alias="APP_ENV")
    api_base_url: AnyHttpUrl = Field(default="http://localhost:8000", alias="API_BASE_URL")
    database_url: str = Field(default="sqlite:///./hiring_journey.db", alias="DATABASE_URL")
    cors_origins: str = Field(
        default="http://localhost:3000,http://localhost:3001,https://hiringjourney.com", alias="CORS_ORIGINS"
    )
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    # Per-IP sliding window for /admin only; 0 disables (e.g. local dev). Single-process memory store.
    admin_rate_limit_per_minute: int = Field(default=120, ge=0, alias="ADMIN_RATE_LIMIT_PER_MINUTE")

    keycloak_server_url: AnyHttpUrl = Field(
        default="https://secure.undash-cop.com", alias="KEYCLOAK_SERVER_URL"
    )
    keycloak_realm: str = Field(default="hiringjourney", alias="KEYCLOAK_REALM")
    keycloak_audience: str = Field(default="hiringjourney-app", alias="KEYCLOAK_AUDIENCE")

    @property
    def keycloak_issuer(self) -> str:
        return f"{str(self.keycloak_server_url).rstrip('/')}/realms/{self.keycloak_realm}"

    @property
    def keycloak_jwks_uri(self) -> str:
        return f"{self.keycloak_issuer}/protocol/openid-connect/certs"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
