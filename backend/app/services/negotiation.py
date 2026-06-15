NEGOTIATION_FRAMEWORKS: list[dict[str, object]] = [
    {
        "id": 1,
        "title": "Salary Negotiation Framework",
        "description": "Step-by-step guide to negotiate your salary effectively",
        "steps": [
            "Research market rates for your role and location",
            "Prepare your value proposition",
            "Set your target and walk-away numbers",
            "Practice your negotiation pitch",
            "Schedule the negotiation conversation",
            "Present your case professionally",
            "Handle counter-offers gracefully",
        ],
        "tips": [
            "Never accept the first offer immediately",
            "Focus on total compensation, not just salary",
            "Use data to support your request",
            "Be prepared to walk away if needed",
            "Maintain a positive, collaborative tone",
        ],
        "templates": [
            "Email template for salary negotiation",
            "Script for phone/video call negotiation",
            "Response template for counter-offers",
        ],
    },
    {
        "id": 2,
        "title": "Benefits Negotiation",
        "description": "How to negotiate non-salary benefits",
        "steps": [
            "Identify valuable benefits",
            "Prioritize your needs",
            "Research company policies",
            "Present your request",
            "Be flexible and creative",
        ],
        "tips": [
            "Health insurance can be worth ₹50K+ annually",
            "Stock options can significantly increase total comp",
            "Remote work flexibility is highly valued",
            "Professional development budget",
            "Additional vacation days",
        ],
        "templates": [
            "Benefits negotiation email",
            "Benefits comparison template",
        ],
    },
]


def market_insights() -> dict[str, object]:
    return {
        "average_salary": 1_250_000,
        "your_offer": 1_200_000,
        "market_range": {"min": 1_100_000, "max": 1_400_000},
    }
