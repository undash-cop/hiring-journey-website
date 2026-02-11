"use client";

import { motion } from "framer-motion";

export function PricingHero() {
  return (
    <div className="bg-white dark:bg-gray-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Start free with invite access. Upgrade when you&apos;re ready to accelerate your career journey. All plans
            include AI credit-based usage.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
