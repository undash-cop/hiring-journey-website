"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Clock, XCircle, Calendar } from "lucide-react";
import Link from "next/link";

// Mock timeline data - Replace with API calls
const timelineEvents = [
  {
    id: 1,
    company: "TechCorp India",
    position: "Software Developer",
    date: "2025-02-10",
    status: "interview",
    statusLabel: "Interview Scheduled",
    icon: Calendar,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Frontend Engineer",
    date: "2025-02-08",
    status: "screening",
    statusLabel: "Under Review",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    id: 3,
    company: "BigTech Inc",
    position: "QA Engineer",
    date: "2025-02-05",
    status: "applied",
    statusLabel: "Application Submitted",
    icon: Briefcase,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
];

export function ApplicationTimeline() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Application Timeline</h2>
        <Link
          href="/dashboard/applications"
          className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          View All
        </Link>
      </div>
      {timelineEvents.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Timeline Line */}
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
                )}

                {/* Icon */}
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${event.bgColor}`}>
                  <Icon className={`h-5 w-5 ${event.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{event.position}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.company}</p>
                    </div>
                    <span className={`ml-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.bgColor} ${event.color}`}>
                      {event.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
