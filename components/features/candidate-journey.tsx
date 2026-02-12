"use client";

import { motion } from "framer-motion";
import { FileText, Search, Zap, MessageSquare, Handshake, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const journeySteps = [
  {
    step: 1,
    title: "Resume Optimization",
    description: "AI analyzes and optimizes your resume for your target role",
    icon: FileText,
    color: "from-primary-500 to-primary-600",
    time: "5 min",
  },
  {
    step: 2,
    title: "Smart Job Discovery",
    description: "Get matched with relevant opportunities in your field",
    icon: Search,
    color: "from-secondary-500 to-secondary-600",
    time: "Instant",
  },
  {
    step: 3,
    title: "Auto Apply",
    description: "Let AI apply to matching jobs while you focus on preparation",
    icon: Zap,
    color: "from-cta-500 to-cta-600",
    time: "Automated",
  },
  {
    step: 4,
    title: "Interview Prep",
    description: "Practice with AI-powered mock interviews and get feedback",
    icon: MessageSquare,
    color: "from-primary-500 to-secondary-500",
    time: "30 min",
  },
  {
    step: 5,
    title: "Offer & Negotiation",
    description: "Negotiate confidently with our proven frameworks",
    icon: Handshake,
    color: "from-secondary-500 to-cta-500",
    time: "Guided",
  },
  {
    step: 6,
    title: "Job Success",
    description: "Start your new role with confidence and legal readiness",
    icon: CheckCircle,
    color: "from-primary-600 to-secondary-600",
    time: "Complete",
  },
];

export function CandidateJourney() {
  return (
    <div className="bg-gradient-to-b from-primary-50/50 via-white to-secondary-50/50 dark:from-primary-950/20 dark:via-gray-950 dark:to-secondary-950/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm leading-6 text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-600/10 dark:ring-primary-400/20 mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">Your Complete Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            From Resume to Job Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Whether you&apos;re a fresher or experienced professional, we guide you through every step of your hiring
            journey in the Indian job market.
          </motion.p>
        </div>

        {/* Desktop Journey Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Animated Connection Line */}
            <div className="absolute top-24 left-0 right-0 h-1">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-cta-500 opacity-40 origin-left"
              />
            </div>

            <div className="grid grid-cols-6 gap-4">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Step Number Badge with Pulse Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-950 border-2 border-primary-500 text-sm font-bold text-primary-600 dark:text-primary-400 shadow-lg">
                      {step.step}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary-500"
                        animate={{
                          scale: [1, 1.5, 1.5],
                          opacity: [0.5, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Card with Hover Effects */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="mt-8 rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-2xl hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
                  >
                    <motion.div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${step.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                    <div className="text-center">
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        {step.time}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Journey Flow */}
        <div className="lg:hidden space-y-6">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-sm font-bold text-white">
                  {step.step}
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="mx-auto mt-2 h-16 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-30" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl bg-white dark:bg-gray-950 p-4 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${step.color}`}
                  >
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
