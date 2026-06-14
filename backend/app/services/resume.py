import json

from sqlalchemy.orm import Session

from app.models import CandidateResume

DEFAULT_SUGGESTIONS = [
    "Add quantifiable achievements to each role",
    "Include keywords from your target job descriptions",
    "Highlight relevant certifications and projects",
    "Keep formatting ATS-friendly with clear section headings",
]

DEFAULT_SKILLS_GAP = ["TypeScript", "System Design", "Cloud (AWS/GCP)"]


def _encode_list(values: list[str]) -> str:
    return json.dumps(values)


def _decode_list(raw: str) -> list[str]:
    try:
        parsed = json.loads(raw or "[]")
        if isinstance(parsed, list):
            return [str(item) for item in parsed]
    except json.JSONDecodeError:
        pass
    return []


def get_or_create_resume(db: Session, user_sub: str) -> CandidateResume:
    resume = db.query(CandidateResume).filter(CandidateResume.user_sub == user_sub).one_or_none()
    if resume:
        return resume

    resume = CandidateResume(
        user_sub=user_sub,
        score=72,
        ats_score=75,
        keyword_match=68,
        skills_gap=_encode_list(DEFAULT_SKILLS_GAP),
        suggestions=_encode_list(DEFAULT_SUGGESTIONS),
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume


def resume_suggestions(resume: CandidateResume) -> list[str]:
    values = _decode_list(resume.suggestions)
    return values or DEFAULT_SUGGESTIONS


def resume_skills_gap(resume: CandidateResume) -> list[str]:
    values = _decode_list(resume.skills_gap)
    return values or DEFAULT_SKILLS_GAP


def bump_score(current: int, delta: int, ceiling: int = 100) -> int:
    return min(current + delta, ceiling)
