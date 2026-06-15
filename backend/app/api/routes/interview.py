from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import AuthUser, get_current_user
from app.db import get_db
from app.models import InterviewSession
from app.services.credits import INTERVIEW_PREP_COST, deduct_credits, get_or_create_credit
from app.services.interview import INTERVIEW_QUESTIONS, generate_feedback

router = APIRouter(prefix="/interview", tags=["interview"])


class InterviewQuestionsResponse(BaseModel):
    items: list[str]


class InterviewSessionItem(BaseModel):
    id: int
    type: str
    score: int
    date: datetime
    questions_answered: int


class InterviewSessionsResponse(BaseModel):
    items: list[InterviewSessionItem]
    average_score: int
    total_sessions: int


class InterviewFeedbackRequest(BaseModel):
    interview_type: str = Field(pattern="^(hr|technical)$")
    question: str = Field(min_length=3, max_length=500)
    answer: str = Field(min_length=3, max_length=5000)


class InterviewFeedbackResponse(BaseModel):
    score: int
    feedback: str
    strengths: list[str]
    improvements: list[str]


class CreateInterviewSessionRequest(BaseModel):
    interview_type: str = Field(pattern="^(hr|technical)$")
    score: int = Field(ge=0, le=100)
    questions_answered: int = Field(ge=1, le=50)


@router.get("/questions", response_model=InterviewQuestionsResponse)
async def get_interview_questions(
    type: str = Query(..., pattern="^(hr|technical)$"),
    _: AuthUser = Depends(get_current_user),
) -> InterviewQuestionsResponse:
    return InterviewQuestionsResponse(items=INTERVIEW_QUESTIONS[type])


@router.get("/sessions", response_model=InterviewSessionsResponse)
async def list_interview_sessions(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InterviewSessionsResponse:
    sessions = db.scalars(
        select(InterviewSession)
        .where(InterviewSession.user_sub == current_user.sub)
        .order_by(InterviewSession.created_at.desc())
    ).all()
    items = [
        InterviewSessionItem(
            id=session.id,
            type=session.interview_type,
            score=session.score,
            date=session.created_at,
            questions_answered=session.questions_answered,
        )
        for session in sessions
    ]
    average = round(sum(s.score for s in sessions) / len(sessions)) if sessions else 0
    return InterviewSessionsResponse(items=items, average_score=average, total_sessions=len(sessions))


@router.post("/feedback", response_model=InterviewFeedbackResponse)
async def submit_interview_feedback(
    payload: InterviewFeedbackRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InterviewFeedbackResponse:
    credit = get_or_create_credit(db, current_user.sub)
    try:
        deduct_credits(db, credit, INTERVIEW_PREP_COST)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Insufficient credits for interview prep.",
        ) from None

    result = generate_feedback(payload.answer, payload.interview_type)
    db.commit()
    return InterviewFeedbackResponse(**result)


@router.post("/sessions", response_model=InterviewSessionItem, status_code=status.HTTP_201_CREATED)
async def create_interview_session(
    payload: CreateInterviewSessionRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InterviewSessionItem:
    session = InterviewSession(
        user_sub=current_user.sub,
        interview_type=payload.interview_type,
        score=payload.score,
        questions_answered=payload.questions_answered,
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return InterviewSessionItem(
        id=session.id,
        type=session.interview_type,
        score=session.score,
        date=session.created_at,
        questions_answered=session.questions_answered,
    )
