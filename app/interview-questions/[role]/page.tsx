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
    path: `/interview-questions/${role}`,
    title: `${label} interview questions | Hiring Journey`,
    description: `Role-based ${label} interview questions with answers and India-focused hiring patterns.`,
    keywords: [`${label} interview questions`, "interview preparation India"],
  });
}

export default async function InterviewQuestionsPage({ params }: Props) {
  const { role } = await params;
  if (!roleRoadmaps.includes(role as (typeof roleRoadmaps)[number])) notFound();
  const label = role.replaceAll("-", " ");
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{label} interview questions</h1>
      <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Explain your latest project impact in measurable terms.</li>
        <li>How do you debug production issues under time pressure?</li>
        <li>What trade-offs do you evaluate while designing systems?</li>
      </ul>
    </main>
  );
}
