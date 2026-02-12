"use client";

import { motion } from "framer-motion";
import { BookOpen, Search, TrendingUp } from "lucide-react";

export function BlogHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-cta-500 dark:from-primary-800 dark:via-secondary-800 dark:to-cta-700 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm leading-6 text-white ring-1 ring-inset ring-white/20"
          >
            <BookOpen className="h-4 w-4" />
            <span className="font-semibold">Career Resources</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl"
          >
            Career Insights & Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-xl leading-8 text-primary-100"
          >
            Expert advice, industry insights, and practical tips to accelerate your career journey in India&apos;s job market.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-primary-100"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>50+ Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span>Updated Weekly</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
