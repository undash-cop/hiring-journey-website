"use client";

import { use, useEffect, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import FeatureUnavailable from "@/components/app/components/FeatureUnavailable";
import { FEATURE_FLAGS } from "@/lib/constants";
import CandidateDashboard from "@/components/app/features/candidate/dashboard/CandidateDashboard";
import ResumePage from "@/components/app/features/candidate/resume/ResumePage";
import JobsPage from "@/components/app/features/candidate/jobs/JobsPage";
import AutoApplyPage from "@/components/app/features/candidate/auto-apply/AutoApplyPage";
import InterviewPage from "@/components/app/features/candidate/interview/InterviewPage";
import TrackerPage from "@/components/app/features/candidate/tracker/TrackerPage";
import NegotiationPage from "@/components/app/features/candidate/negotiation/NegotiationPage";
import LegalReadinessPage from "@/components/app/features/candidate/legal/LegalReadinessPage";
import CodingArenaPage from "@/components/app/features/candidate/coding-arena/CodingArenaPage";
import CreditsPage from "@/components/app/features/candidate/credits/CreditsPage";
import ProfilePage from "@/components/app/features/candidate/profile/ProfilePage";
import CandidateSettingsPage from "@/components/app/features/candidate/settings/SettingsPage";

const candidateRouteMap: Record<string, ComponentType> = {
  dashboard: CandidateDashboard,
  resume: ResumePage,
  jobs: JobsPage,
  "auto-apply": AutoApplyPage,
  interview: InterviewPage,
  tracker: TrackerPage,
  negotiation: NegotiationPage,
  legal: LegalReadinessPage,
  "coding-arena": CodingArenaPage,
  credits: CreditsPage,
  profile: ProfilePage,
  settings: CandidateSettingsPage,
};

type CandidateSectionPageProps = {
  params: Promise<{ section: string }>;
};

export default function CandidateSectionPage({ params }: CandidateSectionPageProps) {
  const router = useRouter();
  const { section: rawSection } = use(params);
  const section = decodeURIComponent(rawSection).toLowerCase();
  const Component = candidateRouteMap[section];
  useEffect(() => {
    if (!Component) {
      router.replace("/app/dashboard");
    }
  }, [Component, router]);
  if (!Component) return null;

  if (section === "coding-arena" && !FEATURE_FLAGS.CODING_ARENA) {
    return (
      <FeatureUnavailable
        title="Coding Arena"
        description="Coding challenges are coming soon. This feature is disabled in production until the API is ready."
      />
    );
  }

  if (section === "auto-apply" && !FEATURE_FLAGS.AUTO_APPLY) {
    return (
      <FeatureUnavailable
        title="Auto Apply"
        description="Auto-apply is temporarily unavailable."
      />
    );
  }

  return <Component />;
}
