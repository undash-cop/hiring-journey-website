"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Sparkles, TrendingUp, Plus, Edit, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

// Mock data - Replace with API calls
const mockResumes = [
  {
    id: 1,
    role: "Software Developer",
    score: 85,
    version: 2,
    lastUpdated: "2025-02-10",
    status: "optimized",
  },
  {
    id: 2,
    role: "QA Engineer",
    score: 78,
    version: 1,
    lastUpdated: "2025-02-08",
    status: "needs-review",
  },
];

export function ResumeManagement() {
  const [resumes] = useState(mockResumes);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Resume Management</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Upload, optimize, and manage your resumes for different job roles.
        </p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload New Resume</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Upload your resume and let AI optimize it for your target role
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors">
            <Upload className="h-4 w-4" />
            Upload Resume
          </button>
        </div>
      </motion.div>

      {/* Resume List */}
      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes yet"
          description="Upload your first resume to get started with AI-powered optimization."
          action={{
            label: "Upload Resume",
            onClick: () => console.log("Upload resume"),
          }}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{resume.role}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Version {resume.version} • Updated {new Date(resume.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-md p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Resume Score</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{resume.score}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
                  <TrendingUp className="h-4 w-4" />
                  Optimize
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
