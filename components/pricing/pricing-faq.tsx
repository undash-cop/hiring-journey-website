"use client";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PRICING_FAQ } from "@/lib/marketing-faq";

export function PricingFAQ() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Everything you need to know about our pricing and credit system.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <FaqAccordion items={PRICING_FAQ} />
        </div>
      </div>
    </div>
  );
}
