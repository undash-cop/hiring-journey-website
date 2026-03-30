import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  path: "/blog",
  title: "Career Blog - Hiring Journey",
  description: "Career guides, interview prep, salary insights, and AI job-search strategies for India.",
  keywords: ["career blog India", "interview questions India", "salary guides India"],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
