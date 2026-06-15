INTERVIEW_QUESTIONS: dict[str, list[str]] = {
    "hr": [
        "Tell me about yourself.",
        "Why do you want to work here?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "How do you handle stress and pressure?",
        "Describe a challenging situation you faced at work.",
    ],
    "technical": [
        "Explain how React hooks work.",
        "What is the difference between let, const, and var?",
        "How would you optimize a slow database query?",
        "Explain the difference between REST and GraphQL.",
        "How does the JavaScript event loop work?",
        "Explain the concept of closures in JavaScript.",
    ],
}


def generate_feedback(answer: str, interview_type: str) -> dict[str, object]:
    trimmed = answer.strip()
    word_count = len(trimmed.split())
    base = 55
    if word_count >= 40:
        base += 20
    elif word_count >= 20:
        base += 12
    elif word_count >= 8:
        base += 5
    else:
        base -= 10

    if interview_type == "technical" and any(
        term in trimmed.lower() for term in ("example", "because", "trade-off", "edge case")
    ):
        base += 8

    score = max(40, min(base, 95))
    strengths: list[str] = []
    improvements: list[str] = []

    if word_count >= 25:
        strengths.append("Clear and detailed explanation")
    else:
        improvements.append("Add more detail and concrete examples")

    if "i " in trimmed.lower() or "my " in trimmed.lower():
        strengths.append("Good use of personal experience")
    else:
        improvements.append("Use first-person examples from your experience")

    if interview_type == "technical" and any(c.isdigit() for c in trimmed):
        strengths.append("Referenced measurable outcomes")

    if not strengths:
        strengths.append("Answer addresses the question")

    if not improvements:
        improvements.append("Consider mentioning trade-offs or edge cases")

    feedback = (
        "Strong answer with good structure."
        if score >= 80
        else "Solid start — expand with specifics and measurable impact."
        if score >= 65
        else "Try structuring your answer with context, action, and result."
    )

    return {
        "score": score,
        "feedback": feedback,
        "strengths": strengths[:3],
        "improvements": improvements[:3],
    }
