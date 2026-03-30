import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogCategories } from "@/lib/seo-data";
import { blogSummaries } from "@/lib/content-data";
import { getRelatedBlogPosts } from "@/lib/blog-related";
import { createPageMetadata, schema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogContent } from "@/components/blog/blog-content";
import { RelatedCategoryLink, RelatedPostLink } from "@/components/blog/related-post-link";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return blogSummaries.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!blogCategories.includes(category as (typeof blogCategories)[number])) return {};
  const post = blogSummaries.find((item) => item.categorySlug === category && item.slug === slug);
  if (!post) return {};

  return createPageMetadata({
    path: `/blog/${category}/${slug}`,
    title: `${post.title} | Hiring Journey Blog`,
    description: post.excerpt,
    keywords: [post.category, "India careers", "hiring journey"],
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { category, slug } = await params;
  if (!blogCategories.includes(category as (typeof blogCategories)[number])) notFound();
  const post = blogSummaries.find((item) => item.categorySlug === category && item.slug === slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post, blogSummaries, 3);
  const readableTitle = post.title;
  const toc = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", ""));
  const faqItems = post.faq;

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={schema.blogPosting({
          title: readableTitle,
          description: post.excerpt,
          path: `/blog/${category}/${slug}`,
          publishedAt: post.date,
          authorName: post.author,
        })}
      />
      <JsonLd
        data={schema.faq(faqItems)}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <Link href={`/blog/${category}`}>{category}</Link> /{" "}
        <span>{readableTitle}</span>
      </nav>
      <h1 className="mt-4 text-4xl font-display font-bold text-gray-900 dark:text-white capitalize">{readableTitle}</h1>
      <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
      <aside className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">Table of contents</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {toc.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </aside>
      <section className="prose dark:prose-invert mt-8 max-w-none">
        <BlogContent content={post.content} />
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.question}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Related posts</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((related, index) => (
            <li key={related.id}>
              <RelatedPostLink
                href={`/blog/${related.categorySlug}/${related.slug}`}
                currentPostSlug={post.slug}
                currentCategorySlug={post.categorySlug}
                relatedPostSlug={related.slug}
                relatedCategorySlug={related.categorySlug}
                position={index + 1}
                className="block h-full rounded-xl border border-gray-200 p-4 transition hover:border-primary-500 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-primary-600">{related.category}</span>
                <span className="mt-1 block font-semibold text-gray-900 dark:text-white">{related.title}</span>
                <span className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{related.excerpt}</span>
                <span className="mt-2 block text-xs text-gray-500">{related.date}</span>
              </RelatedPostLink>
            </li>
          ))}
        </ul>
        <RelatedCategoryLink
          className="mt-6 inline-block text-sm font-semibold text-primary-600"
          href={`/blog/${category}`}
          currentPostSlug={post.slug}
          currentCategorySlug={post.categorySlug}
        >
          More from this category →
        </RelatedCategoryLink>
      </section>
    </article>
  );
}
