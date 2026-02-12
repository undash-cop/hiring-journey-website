"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Target, Handshake, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const experiencedSteps = [
  {
    icon: Briefcase,
    title: "2-7 Years Experience?",
    description: "Level up your career. Find better opportunities and negotiate better packages.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Move from Support to Dev, Analyst to Lead, or switch domains entirely.",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Target,
    title: "Strategic Applications",
    description: "Apply to roles that match your experience level and career goals.",
    color: "from-cta-500 to-cta-600",
  },
  {
    icon: Handshake,
    title: "Better Negotiation",
    description: "Negotiate salary, benefits, and role with confidence using our frameworks.",
    color: "from-primary-500 to-secondary-500",
  },
  {
    icon: CheckCircle,
    title: "Career Advancement",
    description: "Make informed decisions about offers, notice periods, and career moves.",
    color: "from-secondary-500 to-cta-500",
  },
];

export function ExperiencedJourney() {
  return (
    <div className="bg-gradient-to-b from-white to-secondary-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-secondary-950/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary-100 dark:bg-secondary-900/30 px-4 py-1 text-sm leading-6 text-secondary-600 dark:text-secondary-400 ring-1 ring-inset ring-secondary-600/10 dark:ring-secondary-400/20 mb-6"
          >
            <Briefcase className="h-4 w-4" />
            <span className="font-semibold">For Experienced Professionals</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Accelerate Your Career Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            With 2-7 years of experience, you&apos;re ready for the next level. We help you navigate job transitions,
            salary negotiations, and career advancement in India&apos;s dynamic job market.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {experiencedSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Animated Connection Arrow (Desktop) */}
              {index < experiencedSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-secondary-500 to-cta-500 opacity-30 z-0 origin-left"
                />
              )}

              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-2xl hover:ring-secondary-500 dark:hover:ring-secondary-400 transition-all h-full"
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

        {/* Experienced Professional Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-secondary-600 to-primary-600 p-8 lg:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              Success Story
            </div>
            <blockquote className="text-xl font-semibold text-white mb-4">
              &quot;After 3 years in Support, I wanted to transition to Development. Hiring Journey helped me optimize
              my resume, prepare for technical interviews, and negotiate a 40% salary increase. Best career decision!&quot;
            </blockquote>
            <p className="text-secondary-100">— Rahul K., Software Developer, Pune</p>
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
            className="inline-flex items-center gap-2 rounded-md bg-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 transition-colors"
          >
            Accelerate Your Career
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
