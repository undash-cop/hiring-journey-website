import { AboutHero } from "@/components/about/about-hero";
import { VisionMission } from "@/components/about/vision-mission";
import { OurStory } from "@/components/about/our-story";
import { IndiaFirst } from "@/components/about/india-first";
import { ImpactSection } from "@/components/about/impact-section";
import { TeamSection } from "@/components/about/team-section";
import { CompanyInfo } from "@/components/about/company-info";
import { CTABanner } from "@/components/sections/cta-banner";
import { createPageMetadata } from "@/lib/seo";

import type { Metadata } from "next";
export const metadata: Metadata = createPageMetadata({
  path: "/about",
  title: "About - Hiring Journey",
  description: "Learn about Hiring Journey's India-first mission for career success at scale.",
  keywords: ["career growth India", "job preparation platform", "Hiring Journey company"],
});
export const dynamic = "force-static";
export const revalidate = false;

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
