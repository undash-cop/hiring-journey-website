"use client";

import { motion } from "framer-motion";
import { FileText, TrendingUp, Sparkles, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ApplicationTimeline } from "@/components/dashboard/application-timeline";

// Mock data - Replace with API calls
const mockData = {
  resumeScore: 78,
  appliedCompanies: 12,
  creditsUsed: 145,
  creditsTotal: 200,
  interviewsScheduled: 3,
};

export function DashboardWidgets() {
  const creditPercentage = (mockData.creditsUsed / mockData.creditsTotal) * 100;
  const creditsRemaining = mockData.creditsTotal - mockData.creditsUsed;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {/* Resume Score Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resume Score</p>
              <p className="mt-2 text-3xl font-display font-bold text-gray-900 dark:text-white">
                {mockData.resumeScore}
                <span className="text-lg text-gray-500 dark:text-gray-400">/100</span>
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <Link
            href="/dashboard/resume"
            className="mt-4 flex items-center text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Improve resume
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>

        {/* Applied Companies Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Applied Companies</p>
              <p className="mt-2 text-3xl font-display font-bold text-gray-900 dark:text-white">
                {mockData.appliedCompanies}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
              <TrendingUp className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
          </div>
          <Link
            href="/dashboard/applications"
            className="mt-4 flex items-center text-sm font-semibold text-secondary-600 hover:text-secondary-500 dark:text-secondary-400 dark:hover:text-secondary-300"
          >
            View applications
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>

        {/* Credit Usage Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Credits</p>
              <p className="mt-2 text-3xl font-display font-bold text-gray-900 dark:text-white">
                {creditsRemaining}
                <span className="text-lg text-gray-500 dark:text-gray-400">/{mockData.creditsTotal}</span>
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cta-100 dark:bg-cta-900/30">
              <Sparkles className="h-6 w-6 text-cta-600 dark:text-cta-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all"
                style={{ width: `${creditPercentage}%` }}
              />
            </div>
            {creditsRemaining < 50 && (
              <Link
                href="/pricing"
                className="mt-2 flex items-center text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Upgrade for more credits
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Interviews Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Interviews Scheduled</p>
              <p className="mt-2 text-3xl font-display font-bold text-gray-900 dark:text-white">
                {mockData.interviewsScheduled}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <Link
            href="/dashboard/interviews"
            className="mt-4 flex items-center text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Prepare for interviews
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Application Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <ApplicationTimeline />
      </motion.div>
    </div>
  );
}
