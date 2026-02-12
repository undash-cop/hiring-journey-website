"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, Video, BookOpen, Play, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

// Mock data - Replace with API calls
const mockInterviews = [
  {
    id: 1,
    company: "TechCorp India",
    position: "Software Developer",
    date: "2025-02-15",
    time: "10:00 AM",
    type: "Technical",
    status: "scheduled",
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Frontend Engineer",
    date: "2025-02-18",
    time: "2:00 PM",
    type: "HR",
    status: "scheduled",
  },
];

export function InterviewPrep() {
  const [interviews] = useState(mockInterviews);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Interview Preparation</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Prepare for your upcoming interviews with AI-powered mock sessions and practice questions.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all text-left"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Mock Interview</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Practice with AI-powered mock interviews
          </p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all text-left"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
            <BookOpen className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Practice Questions</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Browse common interview questions
          </p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all text-left"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cta-100 dark:bg-cta-900/30">
            <Video className="h-6 w-6 text-cta-600 dark:text-cta-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Video Prep</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Watch interview preparation videos
          </p>
        </motion.button>
      </div>

      {/* Upcoming Interviews */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Interviews</h3>
        {interviews.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No interviews scheduled"
            description="Interviews you've scheduled will appear here."
          />
        ) : (
          <div className="space-y-4">
            {interviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{interview.position}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{interview.company}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(interview.date).toLocaleDateString("en-IN", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>{interview.time}</span>
                      <span className="rounded-full bg-primary-100 dark:bg-primary-900/30 px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400">
                        {interview.type}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
                    <Play className="h-4 w-4" />
                    Prepare
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
