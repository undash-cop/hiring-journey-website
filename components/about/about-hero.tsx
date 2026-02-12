"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Users, TrendingUp } from "lucide-react";

export function AboutHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-cta-500 dark:from-primary-800 dark:via-secondary-800 dark:to-cta-700 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
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
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">Our Story</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl"
          >
            Transforming careers, one journey at a time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-xl leading-8 text-primary-100"
          >
            We&apos;re on a mission to democratize career success for India&apos;s job seekers through AI-powered tools
            and personalized guidance.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-white/80" />
              </div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-primary-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Target className="h-8 w-8 text-white/80" />
              </div>
              <div className="text-3xl font-bold text-white">85%</div>
              <div className="text-sm text-primary-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-white/80" />
              </div>
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-sm text-primary-100">Jobs Applied</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
