import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roleRoadmaps, salaryLocations } from "@/lib/seo-data";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ role: string; location: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return roleRoadmaps.flatMap((role) => salaryLocations.map((location) => ({ role, location })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role, location } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) return {};
  if (!salaryLocations.includes(location as (typeof salaryLocations)[number])) return {};

  const roleLabel = role.replaceAll("-", " ");
  return createPageMetadata({
    path: `/salary/${role}/${location}`,
    title: `${roleLabel} salary in ${location} | Hiring Journey`,
    description: `Salary insights for ${roleLabel} in ${location} with India-first benchmarks.`,
    keywords: [`${roleLabel} salary ${location}`, "salary insights India", "fresher salary India"],
  });
}

export default async function SalaryPage({ params }: Props) {
  const { role, location } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) notFound();
  if (!salaryLocations.includes(location as (typeof salaryLocations)[number])) notFound();

  const roleLabel = role.replaceAll("-", " ");
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">
        {roleLabel} salary in {location}
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Market-aware salary benchmarks with fresher to senior progression and demand trends.
      </p>
    </main>
  );
}
