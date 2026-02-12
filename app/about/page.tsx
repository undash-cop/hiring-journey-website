import { AboutHero } from "@/components/about/about-hero";
import { VisionMission } from "@/components/about/vision-mission";
import { OurStory } from "@/components/about/our-story";
import { IndiaFirst } from "@/components/about/india-first";
import { ImpactSection } from "@/components/about/impact-section";
import { TeamSection } from "@/components/about/team-section";
import { CompanyInfo } from "@/components/about/company-info";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata = {
  title: "About - Hiring Journey",
  description: "Learn about Hiring Journey's mission to transform India's job market and help job seekers succeed.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <VisionMission />
      <OurStory />
      <IndiaFirst />
      <ImpactSection />
      <TeamSection />
      <CompanyInfo />
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner />
        </div>
      </div>
    </div>
  );
}
