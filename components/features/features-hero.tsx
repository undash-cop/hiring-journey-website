"use client";

import { motion } from "framer-motion";

export function FeaturesHero() {
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
            Everything you need to succeed
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From resume optimization to offer negotiation, we provide comprehensive tools and guidance for every step of
            your hiring journey.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
