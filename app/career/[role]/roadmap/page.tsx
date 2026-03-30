import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roleRoadmaps } from "@/lib/seo-data";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ role: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return roleRoadmaps.map((role) => ({ role }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) return {};
  const label = role.replaceAll("-", " ");
  return createPageMetadata({
    path: `/career/${role}/roadmap`,
    title: `${label} roadmap in India | Hiring Journey`,
    description: `Step-by-step ${label} roadmap for India-first job preparation and career growth.`,
    keywords: [`${label} roadmap India`, "career switch roadmap India"],
  });
}

export default async function CareerRoadmapPage({ params }: Props) {
  const { role } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) notFound();
  const label = role.replaceAll("-", " ");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={schema.course(`${label} roadmap`, `Roadmap for becoming a ${label}`, `/career/${role}/roadmap`)}
      />
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{label} roadmap</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Milestone-based path tailored for India-first job market demand.</p>
      <ol className="mt-8 list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
        <li>Foundation skills and tools</li>
        <li>Portfolio projects with Indian business examples</li>
        <li>Interview preparation and role-specific questions</li>
        <li>Salary negotiation checklist</li>
      </ol>
    </main>
  );
}
