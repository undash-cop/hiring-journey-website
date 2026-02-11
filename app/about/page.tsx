import { AboutHero } from "@/components/about/about-hero";
import { VisionMission } from "@/components/about/vision-mission";
import { IndiaFirst } from "@/components/about/india-first";
import { CompanyInfo } from "@/components/about/company-info";

export const metadata = {
  title: "About - Hiring Journey",
  description: "Learn about Hiring Journey's mission to transform India's job market and help job seekers succeed.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <VisionMission />
      <IndiaFirst />
      <CompanyInfo />
    </div>
  );
}
