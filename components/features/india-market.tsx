"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, TrendingUp, Users, CheckCircle } from "lucide-react";

const marketFeatures = [
  {
    icon: MapPin,
    title: "Tier-2 & Tier-3 Cities",
    description: "Designed for job seekers in smaller cities with limited local opportunities",
    stat: "60% of users",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Building2,
    title: "Indian Companies",
    description: "Job database focused on Indian startups, MNCs, and established companies",
    stat: "10K+ companies",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Real salary data for Indian market—negotiate with confidence",
    stat: "Market rates",
    color: "from-cta-500 to-cta-600",
  },
  {
    icon: Users,
    title: "Role-Specific Guidance",
    description: "Tailored for QA, Dev, Analyst, Support, and Ops roles in India",
    stat: "5+ roles",
    color: "from-primary-500 to-secondary-500",
  },
];

export function IndiaMarket() {
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
            Built for India&apos;s Job Market
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            We understand the unique challenges of India&apos;s job market and have built Hiring Journey specifically
            to address them.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {marketFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
                <CheckCircle className="h-4 w-4" />
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indian Market Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-br from-primary-50 via-secondary-50 to-cta-50 dark:from-primary-950/20 dark:via-secondary-950/20 dark:to-cta-950/20 p-8 lg:p-12"
        >
          <div className="mx-auto max-w-3xl">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 text-center">
              Challenges We Solve
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Limited Local Opportunities</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    We help you discover remote and relocation opportunities beyond your city.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-600 text-white text-xs font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Resume Quality Issues</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    AI-powered optimization ensures your resume stands out in competitive markets.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cta-600 text-white text-xs font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Interview Preparation</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Practice with AI mock interviews tailored to Indian interview patterns.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Salary Negotiation</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Get frameworks and data to negotiate better packages in the Indian market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
