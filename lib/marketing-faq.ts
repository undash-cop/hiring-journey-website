export type FaqItem = {
  question: string;
  answer: string;
};

export const GENERAL_FAQ: FaqItem[] = [
  {
    question: "Who is Hiring Journey for?",
    answer:
      "Freshers, experienced professionals, and career switchers across India — especially tier-2 and tier-3 cities.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Choose Start Free on any marketing page. You will be redirected to Keycloak to register or sign in, then land in the product at /app/dashboard.",
  },
  {
    question: "Does Hiring Journey support salary insights?",
    answer: "Yes. We provide role and location-based salary insights for India-first users.",
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    question: "What is invite-based access?",
    answer:
      "Free plan users may need an invite code to sign up. You can get an invite from existing users or request one through our waitlist. Invite friends to earn bonus credits.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at your next billing cycle.",
  },
  {
    question: "What happens if I run out of credits?",
    answer:
      "You can purchase additional credits anytime, or upgrade to a higher plan for more monthly credits. We notify you when you are running low.",
  },
  {
    question: "Do credits roll over?",
    answer:
      "No. Credits reset monthly on your billing date. Unused credits do not roll over.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, UPI, and net banking through our payment partners.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Start with our Free plan. No credit card required. Upgrade anytime when you are ready.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Cancel your subscription anytime from your dashboard. Access continues until the end of your billing period.",
  },
  {
    question: "What is the difference between Starter and Pro?",
    answer:
      "Pro includes unlimited resume fixes and higher credit limits. Starter is limited to three resume fixes per month. Both include interview prep and job matching.",
  },
];

export const ALL_FAQ: FaqItem[] = [...GENERAL_FAQ, ...PRICING_FAQ];

/** Home page FAQ preview (first four general/product questions). */
export const HOME_FAQ_PREVIEW: FaqItem[] = [
  {
    question: "How does the AI resume optimization work?",
    answer:
      "Our AI analyzes your resume against job descriptions, identifies skill gaps, optimizes keywords for ATS systems, and provides role-specific improvements in minutes.",
  },
  {
    question: "Is Hiring Journey suitable for freshers?",
    answer:
      "Yes. We include resume building, entry-level job matching, interview preparation, and fresher-specific negotiation guidance.",
  },
  {
    question: "How does auto-apply work?",
    answer:
      "Set your role, location, and salary preferences. Our AI applies to matching jobs with review or full automation based on your settings.",
  },
  {
    question: "What if I run out of AI credits?",
    answer:
      "Purchase additional credits or upgrade your plan. We notify you when you are running low and show usage in your dashboard.",
  },
];
