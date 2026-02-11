import { FeaturesHero } from "@/components/features/features-hero";
import { FeatureDetails } from "@/components/features/feature-details";

export const metadata = {
  title: "Features - Hiring Journey",
  description: "Discover all the powerful features that make Hiring Journey your complete career success platform.",
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <FeaturesHero />
      <FeatureDetails />
    </div>
  );
}
