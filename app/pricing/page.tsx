import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { CreditSystem } from "@/components/pricing/credit-system";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { CTABanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata, schema } from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = createPageMetadata({
  path: "/pricing",
  title: "Pricing - Hiring Journey",
  description: "Transparent AI credit pricing for resume, interview prep, and career growth tools.",
  keywords: ["AI job tools India", "resume tools pricing", "interview preparation platform India"],
});

export const dynamic = "force-static";
export const revalidate = false;

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <JsonLd
        data={schema.product("Hiring Journey Pro Plans", "AI-powered career platform pricing plans", "/pricing")}
      />
      <PricingHero />
      <PricingPlans />
      <CreditSystem />
      <ROICalculator />
      <PricingFAQ />
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner />
        </div>
      </div>
    </div>
  );
}
