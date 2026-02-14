import { FeaturesHero } from "@/components/features/features-hero";
import { CandidateJourney } from "@/components/features/candidate-journey";
import { ProcessFlow } from "@/components/features/process-flow";
import { JourneyComparison } from "@/components/features/journey-comparison";
import { FresherJourney } from "@/components/features/fresher-journey";
import { ExperiencedJourney } from "@/components/features/experienced-journey";
import { IndiaMarket } from "@/components/features/india-market";
import { FeatureDetails } from "@/components/features/feature-details";

import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/features",
  "Features - Hiring Journey",
  "Discover all the powerful features that make Hiring Journey your complete career success platform."
);

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <FeaturesHero />
      <CandidateJourney />
      <ProcessFlow />
      <JourneyComparison />
      <FresherJourney />
      <ExperiencedJourney />
      <IndiaMarket />
      <FeatureDetails />
    </div>
  );
}
