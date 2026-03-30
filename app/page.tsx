import dynamicImport from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { IndiaMarketPulse } from "@/components/sections/india-market-pulse";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

const StatsSection = dynamicImport(() => import("@/components/sections/stats-section").then((m) => m.StatsSection));
const FeaturesSection = dynamicImport(() =>
  import("@/components/sections/features-section").then((m) => m.FeaturesSection)
);
const HowItWorksSection = dynamicImport(() =>
  import("@/components/sections/how-it-works-section").then((m) => m.HowItWorksSection)
);
const BenefitsSection = dynamicImport(() =>
  import("@/components/sections/benefits-section").then((m) => m.BenefitsSection)
);
const TestimonialsSection = dynamicImport(() =>
  import("@/components/sections/testimonials-section").then((m) => m.TestimonialsSection)
);
const FAQPreview = dynamicImport(() => import("@/components/sections/faq-preview").then((m) => m.FAQPreview));
const PricingPreviewSection = dynamicImport(() =>
  import("@/components/sections/pricing-preview-section").then((m) => m.PricingPreviewSection)
);
const CTASection = dynamicImport(() => import("@/components/sections/cta-section").then((m) => m.CTASection));

export const dynamic = "force-static";
export const revalidate = false;

export const metadata = createPageMetadata({
  path: "/",
  title: "Hiring Journey - AI Career Growth Platform for India",
  description:
    "AI-powered career platform for India: resume optimization, interview preparation, salary insights, and career roadmaps.",
  keywords: ["AI resume builder India", "AI interview preparation India", "career roadmap India"],
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <JsonLd data={schema.organization()} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <IndiaMarketPulse />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQPreview />
      <PricingPreviewSection />
      <CTASection />
    </div>
  );
}
