import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { CreditSystem } from "@/components/pricing/credit-system";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { CTABanner } from "@/components/sections/cta-banner";

import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/pricing",
  "Pricing - Hiring Journey",
  "Choose the perfect plan for your career journey. Transparent pricing with AI credit-based usage."
);

export const dynamic = "force-dynamic";

export default function PricingPage() {
  return (
    <div className="flex flex-col">
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
