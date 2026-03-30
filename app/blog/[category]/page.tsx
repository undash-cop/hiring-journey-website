import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogCategories } from "@/lib/seo-data";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ category: string }>;
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return blogCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!blogCategories.includes(category as (typeof blogCategories)[number])) {
    return {};
  }

  const titleCategory = category.split("-").join(" ");
  return createPageMetadata({
    path: `/blog/${category}`,
    title: `${titleCategory} - Blog Category | Hiring Journey`,
    description: `Browse ${titleCategory} guides tailored for India-first career growth.`,
    keywords: [titleCategory, "career growth India", "job preparation"],
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!blogCategories.includes(category as (typeof blogCategories)[number])) {
    notFound();
  }

  const titleCategory = category.split("-").join(" ");
  const links = [
    { href: `/blog/${category}/india-guide-2026`, label: `2026 ${titleCategory} guide for India` },
    { href: `/blog/${category}/roadmap-for-freshers`, label: `${titleCategory} roadmap for freshers` },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={schema.breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: titleCategory, path: `/blog/${category}` },
        ])}
      />
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{titleCategory}</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Explore curated articles to help Indian job seekers improve interviews, resumes, and salary outcomes.
      </p>
      <ul className="mt-10 space-y-4">
        {links.map((item) => (
          <li key={item.href}>
            <Link className="text-primary-600 hover:text-primary-500 font-semibold" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
