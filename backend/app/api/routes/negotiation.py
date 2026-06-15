from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.security import AuthUser, get_current_user
from app.services.negotiation import NEGOTIATION_FRAMEWORKS, market_insights

router = APIRouter(prefix="/negotiation", tags=["negotiation"])


class NegotiationFrameworkItem(BaseModel):
    id: int
    title: str
    description: str
    steps: list[str]
    tips: list[str]
    templates: list[str]


class NegotiationFrameworksResponse(BaseModel):
    items: list[NegotiationFrameworkItem]


class MarketRange(BaseModel):
    min: int
    max: int


class MarketInsightsResponse(BaseModel):
    average_salary: int
    your_offer: int
    market_range: MarketRange


@router.get("/frameworks", response_model=NegotiationFrameworksResponse)
async def get_negotiation_frameworks(
    _: AuthUser = Depends(get_current_user),
) -> NegotiationFrameworksResponse:
    items = [NegotiationFrameworkItem.model_validate(item) for item in NEGOTIATION_FRAMEWORKS]
    return NegotiationFrameworksResponse(items=items)


@router.get("/market-insights", response_model=MarketInsightsResponse)
async def get_market_insights(
    _: AuthUser = Depends(get_current_user),
) -> MarketInsightsResponse:
    data = market_insights()
    return MarketInsightsResponse(
        average_salary=int(data["average_salary"]),
        your_offer=int(data["your_offer"]),
        market_range=MarketRange(**data["market_range"]),  # type: ignore[arg-type]
    )
