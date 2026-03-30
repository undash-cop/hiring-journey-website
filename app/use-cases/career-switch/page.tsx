import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  path: "/use-cases/career-switch",
  title: "Career Switch Use Case - Hiring Journey",
  description: "How Hiring Journey helps professionals switch careers with structured roadmaps.",
  keywords: ["career switch roadmap India", "job preparation roadmap India"],
});

export default function CareerSwitchUseCasePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Career switch use case</h1>
    </main>
  );
}
