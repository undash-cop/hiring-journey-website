"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Users } from "lucide-react";

export function FeaturesHero() {
  return (
    <div className="relative bg-gradient-to-b from-white via-primary-50/30 to-white dark:from-gray-950 dark:via-primary-950/20 dark:to-gray-950 pt-16 pb-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-800/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm leading-6 text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-600/10 dark:ring-primary-400/20">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">Built for India&apos;s Job Seekers</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Your Complete{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From resume optimization to offer negotiation—we guide freshers and experienced professionals through
            every step of finding their dream job in India&apos;s competitive market.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Tier-2 & Tier-3 Cities</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Users className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              <span>Freshers & Experienced</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Sparkles className="h-5 w-5 text-cta-600 dark:text-cta-400" />
              <span>AI-Powered Tools</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
