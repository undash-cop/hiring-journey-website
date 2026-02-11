"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare, Zap, TrendingUp, Sparkles } from "lucide-react";

const creditActions = [
  {
    action: "Resume Fix",
    credits: 10,
    description: "AI-powered resume optimization for one role",
    icon: FileText,
  },
  {
    action: "Mock Interview",
    credits: 25,
    description: "Complete AI-powered interview simulation",
    icon: MessageSquare,
  },
  {
    action: "Auto-Apply (per job)",
    credits: 5,
    description: "Automated application submission",
    icon: Zap,
  },
  {
    action: "Job Match Analysis",
    credits: 3,
    description: "Deep analysis of job fit and requirements",
    icon: TrendingUp,
  },
];

export function CreditSystem() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            AI Credit System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Transparent usage-based pricing
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Every AI-powered action consumes credits. Credits reset monthly based on your plan. Upgrade anytime for
            more credits.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {creditActions.map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500">
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.action}
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                      <Sparkles className="h-3 w-3" />
                      {item.credits} credits
                    </span>
                  </div>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{item.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 rounded-2xl bg-primary-600 dark:bg-primary-700 p-8 lg:p-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-display font-bold text-white">How credits work</h3>
            <div className="mt-6 space-y-4 text-left text-primary-100">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                  1
                </div>
                <p>Credits reset monthly on your billing date</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                  2
                </div>
                <p>Unused credits don&apos;t roll over to the next month</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                  3
                </div>
                <p>You can purchase additional credits anytime</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                  4
                </div>
                <p>Invite friends to earn bonus credits (Free plan)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
