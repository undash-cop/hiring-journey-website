import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { ALL_FAQ } from "@/lib/marketing-faq";
import { MARKETING_CTAS } from "@/lib/marketing-nav";
import { createPageMetadata, schema } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  path: "/faq",
  title: "FAQ - Hiring Journey",
  description: "Frequently asked questions about Hiring Journey AI career platform.",
  keywords: ["Hiring Journey FAQ", "career tools FAQ"],
});

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <JsonLd data={schema.faq(ALL_FAQ)} />
      <JsonLd
        data={schema.breadcrumb([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
        Frequently asked questions
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Answers about the platform, pricing, and getting started.
      </p>
      <div className="mt-12">
        <FaqAccordion items={ALL_FAQ} />
      </div>
      <p className="mt-12 text-sm text-gray-600 dark:text-gray-400">
        Still have questions?{" "}
        <Link href="/contact" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
          Contact us
        </Link>{" "}
        or{" "}
        <Link href={MARKETING_CTAS.signup} className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
          start free
        </Link>
        .
      </p>
    </main>
  );
}
