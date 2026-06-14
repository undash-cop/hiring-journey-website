"""Helpers for job.skills stored as JSON text (SQLite/Postgres compatible)."""

from __future__ import annotations

import json


def encode_skills(skills: list[str]) -> str:
    return json.dumps(skills)


def decode_skills(raw: str | None) -> list[str]:
    if not raw or not raw.strip():
        return []
    try:
        value = json.loads(raw)
        if isinstance(value, list):
            return [str(x) for x in value]
    except json.JSONDecodeError:
        pass
    return []
