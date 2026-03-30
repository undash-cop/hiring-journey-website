import type { Metadata } from "next";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  path: "/faq",
  title: "FAQ - Hiring Journey",
  description: "Frequently asked questions about Hiring Journey AI career platform.",
  keywords: ["Hiring Journey FAQ", "career tools FAQ"],
});

export default function FaqPage() {
  const questions = [
    {
      question: "Who is Hiring Journey for?",
      answer: "Freshers, experienced professionals, and career switchers in India.",
    },
    {
      question: "Does Hiring Journey support salary insights?",
      answer: "Yes. We provide role and location-based salary insights for India-first users.",
    },
  ];
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={schema.faq(questions)} />
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Frequently asked questions</h1>
    </main>
  );
}
