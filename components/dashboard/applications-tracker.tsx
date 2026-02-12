"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

// Mock data - Replace with API calls
const mockApplications = [
  {
    id: 1,
    company: "TechCorp India",
    position: "Software Developer",
    location: "Bangalore",
    appliedDate: "2025-02-05",
    status: "screening",
    statusLabel: "Under Review",
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Frontend Engineer",
    location: "Remote",
    appliedDate: "2025-02-03",
    status: "interview",
    statusLabel: "Interview Scheduled",
  },
  {
    id: 3,
    company: "BigTech Inc",
    position: "QA Engineer",
    location: "Hyderabad",
    appliedDate: "2025-01-28",
    status: "applied",
    statusLabel: "Application Submitted",
  },
];

const statusConfig = {
  applied: { icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
  screening: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  interview: { icon: Calendar, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
  offer: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  rejected: { icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
};

export function ApplicationsTracker() {
  const [applications] = useState(mockApplications);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Application Tracker</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Track all your job applications and their status in one place.
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start applying to jobs and track your progress here."
          action={{
            label: "Browse Jobs",
            onClick: () => console.log("Browse jobs"),
          }}
        />
      ) : (
        <div className="space-y-4">
          {applications.map((application, index) => {
            const status = statusConfig[application.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${status.bg}`}>
                        <Briefcase className={`h-6 w-6 ${status.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {application.position}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{application.company}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Applied {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {application.statusLabel}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
