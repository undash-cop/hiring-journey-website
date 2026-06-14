"use client";

import { use, useEffect, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import FeatureUnavailable from "@/components/app/components/FeatureUnavailable";
import {
  CANDIDATE_SECTION_CONFIG,
  getSectionUnavailableReason,
  isCandidateSection,
} from "@/lib/candidate-features";
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

  if (isCandidateSection(section)) {
    const unavailableReason = getSectionUnavailableReason(section);
    if (unavailableReason) {
      return (
        <FeatureUnavailable
          title={CANDIDATE_SECTION_CONFIG[section].title}
          description={unavailableReason}
        />
      );
    }
  }

  return <Component />;
}
