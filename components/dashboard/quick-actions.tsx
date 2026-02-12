"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

const quickActions = [
  {
    name: "Optimize Resume",
    description: "Get AI-powered resume improvements",
    icon: FileText,
    href: "/dashboard/resume",
    color: "from-primary-500 to-primary-600",
    credits: 10,
  },
  {
    name: "Find Jobs",
    description: "Discover matching opportunities",
    icon: Search,
    href: "/dashboard/applications",
    color: "from-secondary-500 to-secondary-600",
    credits: 3,
  },
  {
    name: "Practice Interview",
    description: "AI mock interview session",
    icon: MessageSquare,
    href: "/dashboard/interviews",
    color: "from-cta-500 to-cta-600",
    credits: 25,
  },
];

export function QuickActions() {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className="group flex items-center gap-4 rounded-xl bg-white dark:bg-gray-950 p-4 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-lg transition-all"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{action.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{action.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {action.credits}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
