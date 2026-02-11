"use client";

import { motion } from "framer-motion";
import { FileText, Search, Zap, Target, MessageSquare, Scale, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    name: "AI Resume Fixer",
    description: "Role-aware resume optimization that highlights your strengths and matches job requirements.",
    icon: FileText,
    color: "from-primary-500 to-primary-600",
  },
  {
    name: "Smart Job Discovery",
    description: "AI-powered job matching that finds opportunities aligned with your skills and career goals.",
    icon: Search,
    color: "from-secondary-500 to-secondary-600",
  },
  {
    name: "Skill-capped Auto Apply",
    description: "Automatically apply to jobs that match your skill level, saving hours of manual work.",
    icon: Zap,
    color: "from-cta-500 to-cta-600",
  },
  {
    name: "Application Tracker",
    description: "Track your entire application journey from submission to offer in one place.",
    icon: Target,
    color: "from-primary-500 to-secondary-500",
  },
  {
    name: "Interview Prep",
    description: "Comprehensive preparation for technical and HR interviews with AI-powered mock sessions.",
    icon: MessageSquare,
    color: "from-secondary-500 to-primary-500",
  },
  {
    name: "HR Negotiation",
    description: "Framework and playbooks to negotiate better offers and compensation packages.",
    icon: Scale,
    color: "from-cta-500 to-primary-500",
  },
  {
    name: "Legal Readiness",
    description: "Validate your legal documents and ensure compliance before joining a new role.",
    icon: Shield,
    color: "from-primary-500 to-secondary-600",
  },
  {
    name: "Coding Arena",
    description: "Practice coding challenges and prepare for technical interviews with Game of Coders.",
    icon: TrendingUp,
    color: "from-secondary-500 to-cta-500",
  },
];

export function FeaturesSection() {
  return (
    <div id="features" className="py-24 sm:py-32 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Complete career success platform
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            From resume creation to offer negotiation, we provide end-to-end guidance for your hiring journey.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
