from types import SimpleNamespace

import jwt
import pytest
from jwt import InvalidTokenError

from app.core.security import KeycloakTokenVerifier


def _verifier() -> KeycloakTokenVerifier:
    settings = SimpleNamespace(
        keycloak_audience="hiringjourney-app",
        keycloak_jwks_uri="https://auth.example.com/realms/hiringjourney/protocol/openid-connect/certs",
    )
    return KeycloakTokenVerifier(settings)  # type: ignore[arg-type]


def _decode_payload(*, aud=None, azp=None) -> dict:
    payload = {
        "sub": "user-1",
        "iss": "https://auth.example.com/realms/hiringjourney",
        "exp": 9999999999,
        "realm_access": {"roles": ["candidate"]},
    }
    if aud is not None:
        payload["aud"] = aud
    if azp is not None:
        payload["azp"] = azp
    return payload


def test_validate_client_accepts_azp_when_aud_is_account() -> None:
    _verifier()._validate_client(_decode_payload(aud="account", azp="hiringjourney-app"))


def test_validate_client_accepts_matching_aud_string() -> None:
    _verifier()._validate_client(_decode_payload(aud="hiringjourney-app"))


def test_validate_client_accepts_matching_aud_list() -> None:
    _verifier()._validate_client(_decode_payload(aud=["account", "hiringjourney-app"]))


def test_validate_client_rejects_wrong_client() -> None:
    with pytest.raises(InvalidTokenError, match="client mismatch"):
        _verifier()._validate_client(_decode_payload(aud="account", azp="other-client"))


def test_jwt_decode_then_validate_client() -> None:
    signing_key = "unit-test-signing-key-32-bytes!!"
    token = jwt.encode(
        _decode_payload(aud="account", azp="hiringjourney-app"),
        signing_key,
        algorithm="HS256",
    )
    claims = jwt.decode(token, signing_key, algorithms=["HS256"], options={"verify_aud": False})
    _verifier()._validate_client(claims)
