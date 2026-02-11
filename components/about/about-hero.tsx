"use client";

import { motion } from "framer-motion";

export function AboutHero() {
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
            Transforming careers, one journey at a time
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We&apos;re on a mission to democratize career success for India&apos;s job seekers through AI-powered tools
            and personalized guidance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
