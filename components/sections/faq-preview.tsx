"use client";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_FAQ_PREVIEW } from "@/lib/marketing-faq";
import { MARKETING_ROUTES } from "@/lib/marketing-routes";

export function FAQPreview() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-12">
          <h2 className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Everything you need to know about Hiring Journey
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={HOME_FAQ_PREVIEW} />
          <div className="mt-10 text-center">
            <Link
              href={MARKETING_ROUTES.faq}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
