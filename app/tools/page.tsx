import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  path: "/tools",
  title: "AI Career Tools - Hiring Journey",
  description: "AI tools for resume optimization, interview prep, and salary negotiation in India.",
  keywords: ["AI career tools India", "AI resume builder India"],
});

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">AI career tools</h1>
      <ul className="mt-6 space-y-2">
        <li><Link className="text-primary-600 font-semibold" href="/tools/ai-resume-builder">AI resume builder</Link></li>
        <li><Link className="text-primary-600 font-semibold" href="/tools/ai-interview-coach">AI interview coach</Link></li>
        <li><Link className="text-primary-600 font-semibold" href="/tools/salary-negotiation-assistant">Salary negotiation assistant</Link></li>
      </ul>
    </main>
  );
}
