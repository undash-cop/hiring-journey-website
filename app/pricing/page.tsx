import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingPlans } from "@/components/pricing/pricing-plans";
import { CreditSystem } from "@/components/pricing/credit-system";
import { PricingFAQ } from "@/components/pricing/pricing-faq";

export const metadata = {
  title: "Pricing - Hiring Journey",
  description: "Choose the perfect plan for your career journey. Transparent pricing with AI credit-based usage.",
};

export const dynamic = "force-dynamic";

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PricingHero />
      <PricingPlans />
      <CreditSystem />
      <PricingFAQ />
    </div>
  );
}
