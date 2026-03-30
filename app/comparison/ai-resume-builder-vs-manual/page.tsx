import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  path: "/comparison/ai-resume-builder-vs-manual",
  title: "AI Resume Builder vs Manual Resume - Hiring Journey",
  description: "Compare AI resume builder and manual resume writing for faster interview callbacks.",
  keywords: ["AI resume builder India", "resume comparison"],
});

export default function ComparisonPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">AI resume builder vs manual resume</h1>
    </main>
  );
}
