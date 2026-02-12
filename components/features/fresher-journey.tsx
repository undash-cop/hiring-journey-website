"use client";

import { motion } from "framer-motion";
import { GraduationCap, FileText, Search, MessageSquare, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const fresherSteps = [
  {
    icon: GraduationCap,
    title: "Final Year Student?",
    description: "Start preparing before graduation. Build a strong resume and practice interviews.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: FileText,
    title: "Resume Building",
    description: "No experience? No problem. We help you highlight projects, internships, and skills effectively.",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Search,
    title: "Entry-Level Jobs",
    description: "Find fresher-friendly positions in QA, Support, Analyst, and Developer roles across India.",
    color: "from-cta-500 to-cta-600",
  },
  {
    icon: MessageSquare,
    title: "Interview Confidence",
    description: "Practice with AI mock interviews. Learn to answer common fresher questions confidently.",
    color: "from-primary-500 to-secondary-500",
  },
  {
    icon: CheckCircle,
    title: "First Job Success",
    description: "Land your first job with proper negotiation and understand your offer letter.",
    color: "from-secondary-500 to-cta-500",
  },
];

export function FresherJourney() {
  return (
    <div className="bg-gradient-to-b from-primary-50/30 to-white dark:from-primary-950/10 dark:via-gray-950 dark:to-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm leading-6 text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-600/10 dark:ring-primary-400/20 mb-6"
          >
            <GraduationCap className="h-4 w-4" />
            <span className="font-semibold">For Freshers & Students</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Your First Job Starts Here
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            As a fresher in India&apos;s competitive job market, you need every advantage. We help you stand out even
            without years of experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {fresherSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Animated Connection Arrow (Desktop) */}
              {index < fresherSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30 z-0 origin-left"
                />
              )}

              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-2xl hover:ring-primary-500 dark:hover:ring-primary-400 transition-all h-full"
              >
                <motion.div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${step.color} group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Fresher Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 lg:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              Success Story
            </div>
            <blockquote className="text-xl font-semibold text-white mb-4">
              &quot;As a BCA graduate from a tier-3 city, I struggled to get interview calls. Hiring Journey helped me
              optimize my resume and practice interviews. I landed my first job as a QA Engineer within 2 months!&quot;
            </blockquote>
            <p className="text-primary-100">— Priya S., QA Engineer, Bangalore</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
          >
            Start as a Fresher
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
