"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Empathy First",
    description:
      "We understand the struggles of job seekers because we've been there. Every feature is designed with real user pain points in mind.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We leverage cutting-edge AI technology to solve complex career challenges, making advanced tools accessible to everyone.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We measure success by the number of job offers our users receive, not just engagement metrics. Your success is our success.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    description:
      "Clear pricing, honest communication, and transparent AI credit usage. No hidden fees, no surprises—just straightforward value.",
    color: "from-green-500 to-emerald-500",
  },
];

export function VisionMission() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="mx-auto max-w-2xl lg:max-w-none mb-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/50 p-8 shadow-sm ring-1 ring-primary-200 dark:ring-primary-800"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-700">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                To empower every job seeker in India with the tools, knowledge, and confidence needed to navigate their
                hiring journey successfully. We believe that everyone deserves access to quality career guidance,
                regardless of their background, location, or experience level.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                Through AI-powered resume optimization, smart job matching, interview preparation, and negotiation
                guidance, we&apos;re leveling the playing field for millions of job seekers across India.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-950/50 dark:to-secondary-900/50 p-8 shadow-sm ring-1 ring-secondary-200 dark:ring-secondary-800"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-secondary-600 to-secondary-700">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                To become India&apos;s most trusted career success platform, helping millions of job seekers land their
                dream jobs. We envision a future where AI-powered guidance makes career success accessible to everyone,
                breaking down barriers and creating equal opportunities.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                By 2030, we aim to help 10 million job seekers find meaningful employment, transforming India&apos;s
                job market into a more efficient, fair, and opportunity-rich ecosystem.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mx-auto max-w-2xl lg:text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            The principles that guide everything we do
          </motion.p>
        </div>

        <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${value.color}`}>
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {value.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{value.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
