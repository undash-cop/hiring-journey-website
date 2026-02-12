"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Target } from "lucide-react";

const processStats = [
  {
    icon: Clock,
    value: "5x Faster",
    label: "Job Application Process",
    description: "Automated applications save hours of manual work",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: TrendingUp,
    value: "3x More",
    label: "Interview Calls",
    description: "Optimized resumes get more responses from employers",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Active Job Seekers",
    description: "Join thousands finding success in the Indian job market",
    color: "from-cta-500 to-cta-600",
  },
  {
    icon: Target,
    value: "85%",
    label: "Success Rate",
    description: "Users land their dream jobs with our comprehensive guidance",
    color: "from-primary-500 to-secondary-500",
  },
];

export function ProcessFlow() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Why Hiring Journey Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Built specifically for the Indian job market, understanding the unique challenges faced by job seekers across
            tier-2 and tier-3 cities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-8 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{stat.label}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Visualization */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-primary-600 via-secondary-600 to-cta-500 p-1"
          >
            <div className="rounded-3xl bg-white dark:bg-gray-950 p-8 lg:p-12">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center mb-8">
                The Smooth Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-2xl font-bold text-primary-600 dark:text-primary-400">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sign Up & Upload</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Create your profile and upload your resume. Takes less than 5 minutes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Optimization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our AI analyzes and optimizes your resume for your target roles automatically.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cta-100 dark:bg-cta-900/30 text-2xl font-bold text-cta-600 dark:text-cta-400">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Get Hired</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Apply to jobs, prepare for interviews, and land your dream role with our guidance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
