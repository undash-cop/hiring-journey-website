"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";

export function VisionMission() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                To empower every job seeker in India with the tools, knowledge, and confidence needed to navigate their
                hiring journey successfully. We believe that everyone deserves access to quality career guidance,
                regardless of their background or location.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-600">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                To become India&apos;s most trusted career success platform, helping millions of job seekers land their
                dream jobs. We envision a future where AI-powered guidance makes career success accessible to everyone,
                breaking down barriers and creating equal opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
