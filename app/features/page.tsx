import { FeaturesHero } from "@/components/features/features-hero";
import { CandidateJourney } from "@/components/features/candidate-journey";
import { ProcessFlow } from "@/components/features/process-flow";
import { JourneyComparison } from "@/components/features/journey-comparison";
import { FresherJourney } from "@/components/features/fresher-journey";
import { ExperiencedJourney } from "@/components/features/experienced-journey";
import { IndiaMarket } from "@/components/features/india-market";
import { FeatureDetails } from "@/components/features/feature-details";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata, schema } from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = createPageMetadata({
  path: "/features",
  title: "Features - Hiring Journey",
  description: "Explore AI resume, interview, salary and roadmap features built for India's job market.",
  keywords: ["AI career tools India", "job preparation roadmap India", "resume optimization India"],
});
export const dynamic = "force-static";
export const revalidate = false;

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={schema.softwareApplication("Hiring Journey Features", "AI career tools for job seekers", "/features")} />
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
