import { FEATURE_FLAGS, type FeatureFlagKey } from "@/lib/feature-flags";

export const MOCK_API_ENABLED = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const CANDIDATE_SECTIONS = [
  "dashboard",
  "resume",
  "jobs",
  "auto-apply",
  "interview",
  "tracker",
  "negotiation",
  "legal",
  "coding-arena",
  "credits",
  "profile",
  "settings",
] as const;

export type CandidateSection = (typeof CANDIDATE_SECTIONS)[number];

type SectionConfig = {
  title: string;
  /** Live backend APIs are wired for this route. */
  liveApi: boolean;
  /** Requires NEXT_PUBLIC_USE_MOCK_API=true when liveApi is false. */
  mockOnly?: boolean;
  /** Optional product flag that must be true (in addition to mock/live rules). */
  featureFlag?: FeatureFlagKey;
  unavailableDescription?: string;
};

export const CANDIDATE_SECTION_CONFIG: Record<CandidateSection, SectionConfig> = {
  dashboard: { title: "Dashboard", liveApi: true },
  jobs: { title: "Job Discovery", liveApi: true },
  tracker: { title: "Application Tracker", liveApi: true },
  profile: { title: "Profile", liveApi: true },
  settings: { title: "Settings", liveApi: true },
  credits: { title: "Credits", liveApi: true },
  resume: { title: "Resume Optimizer", liveApi: true },
  interview: { title: "Interview Prep", liveApi: true },
  negotiation: { title: "Offer & Negotiation", liveApi: true },
  legal: { title: "Legal Readiness", liveApi: true },
  "auto-apply": {
    title: "Auto Apply",
    liveApi: true,
    featureFlag: "AUTO_APPLY",
    unavailableDescription: "Auto-apply is temporarily unavailable.",
  },
  "coding-arena": {
    title: "Coding Arena",
    liveApi: true,
    featureFlag: "CODING_ARENA",
  },
};

export function isCandidateSection(value: string): value is CandidateSection {
  return (CANDIDATE_SECTIONS as readonly string[]).includes(value);
}

export function getSectionUnavailableReason(section: CandidateSection): string | null {
  const config = CANDIDATE_SECTION_CONFIG[section];

  if (config.featureFlag && !FEATURE_FLAGS[config.featureFlag]) {
    return (
      config.unavailableDescription ??
      `${config.title} is temporarily unavailable.`
    );
  }

  if (!config.liveApi && config.mockOnly && !MOCK_API_ENABLED) {
    return (
      config.unavailableDescription ??
      `${config.title} is not available via the API yet. Check back soon.`
    );
  }

  return null;
}
