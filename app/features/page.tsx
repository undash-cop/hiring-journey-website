import nextDynamic from "next/dynamic";
import { FeaturesHero } from "@/components/features/features-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata, schema } from "@/lib/seo";

import type { Metadata } from "next";

const CandidateJourney = nextDynamic(() =>
  import("@/components/features/candidate-journey").then((m) => m.CandidateJourney),
);
const ProcessFlow = nextDynamic(() => import("@/components/features/process-flow").then((m) => m.ProcessFlow));
const JourneyComparison = nextDynamic(() =>
  import("@/components/features/journey-comparison").then((m) => m.JourneyComparison),
);
const FresherJourney = nextDynamic(() => import("@/components/features/fresher-journey").then((m) => m.FresherJourney));
const ExperiencedJourney = nextDynamic(() =>
  import("@/components/features/experienced-journey").then((m) => m.ExperiencedJourney),
);
const IndiaMarket = nextDynamic(() => import("@/components/features/india-market").then((m) => m.IndiaMarket));
const FeatureDetails = nextDynamic(() => import("@/components/features/feature-details").then((m) => m.FeatureDetails));

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
      <JsonLd
        data={schema.softwareApplication(
          "Hiring Journey Features",
          "AI career tools for job seekers",
          "/features",
        )}
      />
      <JsonLd
        data={schema.breadcrumb([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ])}
      />
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
