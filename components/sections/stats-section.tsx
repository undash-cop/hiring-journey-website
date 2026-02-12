"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    name: "Active Job Seekers",
    value: "50,000+",
    icon: Users,
    description: "Users finding success",
    color: "from-primary-500 to-primary-600",
  },
  {
    name: "Jobs Applied",
    value: "500K+",
    icon: Briefcase,
    description: "Applications submitted",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    name: "Success Rate",
    value: "85%",
    icon: TrendingUp,
    description: "Land their dream jobs",
    color: "from-cta-500 to-cta-600",
  },
  {
    name: "Time Saved",
    value: "10hrs",
    icon: Clock,
    description: "Per week with auto-apply",
    color: "from-primary-500 to-secondary-500",
  },
];

export function StatsSection() {
  return (
    <div className="bg-white dark:bg-gray-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{stat.name}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
