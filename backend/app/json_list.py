"""JSON list encoding for SQLite/Postgres text columns."""

from __future__ import annotations

import json


def encode_list(values: list[str]) -> str:
    return json.dumps(values)


def decode_list(raw: str | None) -> list[str]:
    if not raw or not raw.strip():
        return []
    try:
        value = json.loads(raw)
        if isinstance(value, list):
            return [str(x) for x in value]
    except json.JSONDecodeError:
        pass
    return []
