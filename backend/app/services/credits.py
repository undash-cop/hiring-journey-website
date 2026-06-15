from sqlalchemy.orm import Session

from app.models import UserCredit

DEFAULT_CREDITS_TOTAL = 200
JOB_APPLICATION_COST = 5
RESUME_OPTIMIZATION_COST = 10
INTERVIEW_PREP_COST = 25
LEGAL_VALIDATION_COST = 10
AUTO_APPLY_COST = 5


def get_or_create_credit(db: Session, user_sub: str) -> UserCredit:
    credit = db.query(UserCredit).filter(UserCredit.user_sub == user_sub).one_or_none()
    if credit:
        return credit
    credit = UserCredit(
        user_sub=user_sub,
        credits_total=DEFAULT_CREDITS_TOTAL,
        credits_used=0,
        status="active",
    )
    db.add(credit)
    db.commit()
    db.refresh(credit)
    return credit


def credits_remaining(credit: UserCredit) -> int:
    return max(credit.credits_total - credit.credits_used, 0)


def build_usage_breakdown(used: int) -> dict[str, int]:
    """Estimate category split until per-action usage is persisted."""
    if used <= 0:
        return {
            "resumeOptimization": 0,
            "interviewPrep": 0,
            "autoApply": 0,
            "negotiation": 0,
        }
    auto_apply = min(used, max(used // 2, JOB_APPLICATION_COST))
    resume = min(used - auto_apply, max((used - auto_apply) // 2, 0))
    interview = min(used - auto_apply - resume, max((used - auto_apply - resume) // 2, 0))
    negotiation = max(used - auto_apply - resume - interview, 0)
    return {
        "resumeOptimization": resume,
        "interviewPrep": interview,
        "autoApply": auto_apply,
        "negotiation": negotiation,
    }


def build_credit_usage(credit: UserCredit) -> dict[str, int | dict[str, int]]:
    remaining = credits_remaining(credit)
    return {
        "total": credit.credits_total,
        "used": credit.credits_used,
        "remaining": remaining,
        "breakdown": build_usage_breakdown(credit.credits_used),
    }


def deduct_credits(db: Session, credit: UserCredit, amount: int) -> None:
    if amount <= 0:
        return
    if credits_remaining(credit) < amount:
        raise ValueError("insufficient_credits")
    credit.credits_used += amount
    db.add(credit)
