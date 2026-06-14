from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any

import httpx
import jwt
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import InvalidTokenError, PyJWKClient

from app.core.config import Settings, get_settings

bearer_scheme = HTTPBearer(auto_error=True)


@dataclass
class AuthUser:
    sub: str
    email: str | None
    preferred_username: str | None
    roles: list[str]
    raw_claims: dict[str, Any]


class KeycloakTokenVerifier:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._jwks_client = PyJWKClient(settings.keycloak_jwks_uri)
        self._jwks_cache: tuple[datetime, dict[str, Any]] | None = None

    async def _get_jwks(self) -> dict[str, Any]:
        now = datetime.now(tz=timezone.utc)
        if self._jwks_cache and now - self._jwks_cache[0] < timedelta(minutes=10):
            return self._jwks_cache[1]

        async with httpx.AsyncClient(timeout=5) as client:
            response = await client.get(self.settings.keycloak_jwks_uri)
            response.raise_for_status()
            jwks = response.json()
            self._jwks_cache = (now, jwks)
            return jwks

    async def verify(self, token: str) -> AuthUser:
        try:
            await self._get_jwks()
            signing_key = self._jwks_client.get_signing_key_from_jwt(token)

            claims = jwt.decode(
                token,
                key=signing_key.key,
                algorithms=["RS256"],
                issuer=self.settings.keycloak_issuer,
                options={"verify_aud": False},
            )
            self._validate_client(claims)
        except (InvalidTokenError, ValueError, httpx.HTTPError) as exc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token.",
            ) from exc

        realm_roles = claims.get("realm_access", {}).get("roles", [])
        resource_roles = claims.get("resource_access", {}).get(self.settings.keycloak_audience, {}).get(
            "roles", []
        )
        merged_roles = sorted(set([*realm_roles, *resource_roles]))

        return AuthUser(
            sub=claims.get("sub", ""),
            email=claims.get("email"),
            preferred_username=claims.get("preferred_username"),
            roles=merged_roles,
            raw_claims=claims,
        )

    def _validate_client(self, claims: dict[str, Any]) -> None:
        """Keycloak often sets aud=account; client id is in azp."""
        expected = self.settings.keycloak_audience
        audience = claims.get("aud")
        azp = claims.get("azp")

        if isinstance(audience, str) and audience == expected:
            return
        if isinstance(audience, list) and expected in audience:
            return
        if azp == expected:
            return

        raise InvalidTokenError(
            f"Token client mismatch: expected {expected}, got aud={audience!r} azp={azp!r}"
        )


def _build_verifier(settings: Settings = Depends(get_settings)) -> KeycloakTokenVerifier:
    return KeycloakTokenVerifier(settings)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(bearer_scheme),
    verifier: KeycloakTokenVerifier = Depends(_build_verifier),
) -> AuthUser:
    return await verifier.verify(credentials.credentials)


def require_roles(*allowed_roles: str):
    async def _guard(current_user: AuthUser = Depends(get_current_user)) -> AuthUser:
        if not allowed_roles:
            return current_user
        if not set(current_user.roles).intersection(set(allowed_roles)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient role permissions.",
            )
        return current_user

    return _guard
