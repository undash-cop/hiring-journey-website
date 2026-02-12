"use client";

import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp, GraduationCap, Building2, Globe } from "lucide-react";

const challenges = [
  {
    icon: MapPin,
    title: "Tier-2 & Tier-3 Cities",
    description:
      "Limited access to career guidance and job opportunities in smaller cities across India. We bring premium career tools to every corner of the country.",
    stat: "60% of our users",
    statLabel: "from Tier-2/3 cities",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Freshers & Students",
    description:
      "Final-year students and freshers struggle with resume quality, lack of experience, and interview preparation. We provide specialized guidance for entry-level roles.",
    stat: "40% freshers",
    statLabel: "land their first job",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Professionals need structured guidance to advance their careers, negotiate better offers, and transition between roles. We help experienced professionals level up.",
    stat: "₹3L average",
    statLabel: "salary increase",
    color: "from-green-500 to-emerald-500",
  },
];

const indiaFeatures = [
  {
    icon: Building2,
    title: "India-Specific Job Market",
    description:
      "Our AI understands Indian job market nuances, including regional preferences, salary benchmarks, and industry-specific requirements.",
  },
  {
    icon: Users,
    title: "Local Language Support",
    description:
      "Resume optimization and interview prep available in Hindi, Tamil, Telugu, and other regional languages (coming soon).",
  },
  {
    icon: Globe,
    title: "Remote & Hybrid Opportunities",
    description:
      "Special focus on remote and hybrid roles, helping job seekers from smaller cities access opportunities in metro cities.",
  },
];

export function IndiaFirst() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm font-semibold text-primary-600 dark:text-primary-400"
          >
            <MapPin className="h-4 w-4" />
            <span>India-First Approach</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Built for India&apos;s unique challenges
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            We understand the unique challenges faced by India&apos;s job market and have built Hiring Journey to
            address them directly. Our platform is designed with Indian job seekers in mind.
          </motion.p>
        </div>

        {/* Challenges */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl mb-20">
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
            Challenges We Solve
          </h3>
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${challenge.color}`}>
                  <challenge.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white mb-2">
                  {challenge.title}
                </dt>
                <dd className="text-base leading-7 text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</dd>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{challenge.stat}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{challenge.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* India-Specific Features */}
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            India-Specific Features
          </motion.h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {indiaFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-6 ring-1 ring-primary-200 dark:ring-primary-800"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-500">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
