import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { CareersPageClient } from "@/components/careers/careers-page-client";

export const dynamic = "force-static";
export const revalidate = false;
export const metadata: Metadata = createPageMetadata({
  path: "/careers",
  title: "Careers - Hiring Journey",
  description: "Join Hiring Journey and help build India-first AI career products at scale.",
  keywords: ["careers at hiring journey", "india startup jobs", "remote jobs india"],
});

export default function CareersPage() {
  return <CareersPageClient />;
}
