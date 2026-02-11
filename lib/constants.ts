// Pricing plans configuration
export const PRICING_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    credits: 50,
  },
  STARTER: {
    name: "Starter",
    price: 299,
    credits: 200,
  },
  PRO: {
    name: "Pro",
    price: 699,
    credits: 500,
  },
  ELITE: {
    name: "Elite",
    price: 1199,
    credits: 1000,
  },
} as const;

// Credit costs for different actions
export const CREDIT_COSTS = {
  RESUME_FIX: 10,
  MOCK_INTERVIEW: 25,
  AUTO_APPLY: 5,
  JOB_MATCH_ANALYSIS: 3,
} as const;

// Target user segments
export const TARGET_USERS = [
  "Final-year students",
  "Freshers (0–2 years)",
  "Professionals (2–7 years)",
  "BCA / BCom / BSc / BE/BTech",
  "QA, Dev, Analyst, Support, Ops",
  "Tier-2 / Tier-3 India",
] as const;

// Feature flags (for future use)
export const FEATURE_FLAGS = {
  GOOGLE_OAUTH: false,
  CODING_ARENA: false,
  AUTO_APPLY: true,
} as const;
