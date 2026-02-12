"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, ArrowRight, CheckCircle, X } from "lucide-react";

const comparisonData = {
  fresher: {
    icon: GraduationCap,
    title: "Fresher Journey",
    challenges: [
      "No work experience to showcase",
      "Uncertain about resume format",
      "Limited interview experience",
      "Salary negotiation anxiety",
    ],
    solutions: [
      "Highlight projects, internships, and skills",
      "ATS-optimized resume templates",
      "AI mock interviews for practice",
      "Fresher-specific negotiation guides",
    ],
    color: "from-primary-500 to-primary-600",
  },
  experienced: {
    icon: Briefcase,
    title: "Experienced Professional Journey",
    challenges: [
      "Career transition challenges",
      "Salary expectations alignment",
      "Notice period negotiations",
      "Multiple offer comparisons",
    ],
    solutions: [
      "Role transition frameworks",
      "Market rate analysis tools",
      "Notice period calculators",
      "Offer comparison matrices",
    ],
    color: "from-secondary-500 to-secondary-600",
  },
};

export function JourneyComparison() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Your Journey, Your Way
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Whether you&apos;re starting fresh or advancing your career, we provide tailored guidance for your unique
            situation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(comparisonData).map(([key, data], index) => {
            const Icon = data.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${data.color}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">{data.title}</h3>

                {/* Challenges */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                    Common Challenges
                  </h4>
                  <ul className="space-y-3">
                    {data.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-6">
                  <ArrowRight className="h-6 w-6 text-primary-600 dark:text-primary-400 rotate-90 lg:rotate-0" />
                </div>

                {/* Solutions */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                    How We Help
                  </h4>
                  <ul className="space-y-3">
                    {data.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
