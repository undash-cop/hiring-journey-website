import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roleRoadmaps } from "@/lib/seo-data";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ role: string }>;
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return roleRoadmaps.map((role) => ({ role }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) return {};
  const label = role.replaceAll("-", " ");
  return createPageMetadata({
    path: `/resume-examples/${role}`,
    title: `${label} resume examples | Hiring Journey`,
    description: `ATS-friendly ${label} resume examples optimized for India-first hiring market.`,
    keywords: [`${label} resume examples`, "AI resume builder India"],
  });
}

export default async function ResumeExamplesPage({ params }: Props) {
  const { role } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) notFound();
  const label = role.replaceAll("-", " ");
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{label} resume examples</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Role-specific resume layouts with measurable project outcomes and ATS keywords.</p>
    </main>
  );
}
