"use client";

import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: MapPin,
    title: "Tier-2 & Tier-3 Cities",
    description:
      "Limited access to career guidance and job opportunities in smaller cities across India.",
  },
  {
    icon: Users,
    title: "Freshers & Students",
    description:
      "Final-year students and freshers struggle with resume quality and interview preparation.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Professionals need structured guidance to advance their careers and negotiate better offers.",
  },
];

export function IndiaFirst() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            India-First Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Built for India&apos;s unique challenges
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            We understand the unique challenges faced by India&apos;s job market and have built Hiring Journey to address
            them directly.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-600">
                    <problem.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {problem.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{problem.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
