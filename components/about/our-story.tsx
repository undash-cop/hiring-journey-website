"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Zap, Target, TrendingUp, Award } from "lucide-react";

const milestones = [
  {
    year: "2023",
    quarter: "Q1",
    title: "The Beginning",
    description:
      "Founded with a vision to solve India's job market challenges. Started with research and understanding the pain points of job seekers.",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2023",
    quarter: "Q3",
    title: "First Product Launch",
    description:
      "Launched AI Resume Optimizer, helping thousands of freshers create professional resumes. Reached 10,000 users in the first month.",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "Expansion",
    description:
      "Added Smart Job Discovery and Auto-Apply features. Expanded to support experienced professionals. Reached 25,000 active users.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "Interview Prep Launch",
    description:
      "Introduced AI-powered interview preparation with mock interviews. Added HR negotiation framework and legal readiness checks.",
    icon: Target,
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "50K Milestone",
    description:
      "Crossed 50,000 active users. Launched Coding Arena for developers. Achieved 85% success rate in helping users land jobs.",
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-500",
  },
  {
    year: "2025",
    quarter: "Q3",
    title: "100K Users & Partnerships",
    description:
      "Reached 100,000 active users milestone. Established partnerships with top companies and educational institutions across India.",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "Foundation for Scale",
    description:
      "Stabilized core platform architecture, expanded SEO-first content systems, and strengthened analytics for faster India-first growth.",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
  },
  {
    year: "2026",
    quarter: "Q2",
    title: "Q2 Plan: AI Tool Expansion",
    description:
      "Launch role-specific AI tools for resume optimization and interview preparation, improve personalization, and scale high-intent landing pages.",
    icon: Zap,
    color: "from-sky-500 to-blue-600",
  },
  {
    year: "2026",
    quarter: "Q3",
    title: "Q3 Plan: Career Intelligence",
    description:
      "Expand career roadmaps, salary insights, and interview question hubs across major India job roles and city clusters with programmatic SEO.",
    icon: Target,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    year: "2026",
    quarter: "Q4",
    title: "Q4 Plan: Global Readiness",
    description:
      "Prepare for global scale with stronger localization support, enterprise partnerships, and reliability upgrades for 100k+ active users.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
  },
  {
    year: "2027",
    quarter: "Q1",
    title: "Q1 Plan: Platform Intelligence at Scale",
    description:
      "Launch advanced AI career copilots, deepen hiring ecosystem integrations, and optimize retention loops to accelerate sustainable global growth.",
    icon: Award,
    color: "from-amber-500 to-rose-500",
  },
];

export function OurStory() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            From a simple idea to helping 100,000+ job seekers—here&apos;s our story
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline line - centered vertically */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary-500 via-secondary-500 to-cta-500 hidden lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={`${milestone.year}-${milestone.quarter}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-center"
                >
                  {/* Timeline dot - centered on mobile, positioned on desktop */}
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
                    <div className={`flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-gradient-to-r ${milestone.color} ring-4 ring-white dark:ring-gray-950 shadow-lg`}>
                      <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                  </div>

                  {/* Content - left side for even, right side for odd */}
                  <div
                    className={`w-full lg:col-span-1 mt-8 lg:mt-0 ${
                      isEven ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:col-start-2 lg:text-left"
                    }`}
                  >
                    <div className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-3 lg:justify-start" style={isEven ? { justifyContent: "flex-end" } : {}}>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          {milestone.year} {milestone.quarter}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-base leading-7 text-gray-600 dark:text-gray-300">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  {!isEven && <div className="hidden lg:block lg:col-span-1" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
