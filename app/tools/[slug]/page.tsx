import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

const toolSlugs = ["ai-resume-builder", "ai-interview-coach", "salary-negotiation-assistant"] as const;

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!toolSlugs.includes(slug as (typeof toolSlugs)[number])) return {};
  const label = slug.replaceAll("-", " ");
  return createPageMetadata({
    path: `/tools/${slug}`,
    title: `${label} | Hiring Journey AI tools`,
    description: `${label} to accelerate job preparation for India-first candidates.`,
    keywords: [label, "AI career tools India"],
  });
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  if (!toolSlugs.includes(slug as (typeof toolSlugs)[number])) notFound();
  const label = slug.replaceAll("-", " ");

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={schema.softwareApplication(label, `${label} by Hiring Journey`, `/tools/${slug}`)} />
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{label}</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Production SEO template for AI tool landing pages with hourly ISR.</p>
    </main>
  );
}
