"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Zap,
  Target,
  MessageSquare,
  Scale,
  Shield,
  TrendingUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const features = [
  {
    id: "resume-fixer",
    name: "AI Resume Fixer",
    icon: FileText,
    badge: "AI-Powered",
    description:
      "Role-aware resume optimization that analyzes your resume against job requirements and provides actionable improvements.",
    details: [
      "Role-specific optimization for QA, Dev, Analyst, Support, and Ops roles",
      "ATS-friendly formatting that passes applicant tracking systems",
      "Keyword optimization based on job descriptions",
      "Skills gap analysis and recommendations",
      "Multiple resume versions for different roles",
      "Real-time feedback and improvement suggestions",
    ],
    color: "from-primary-500 to-primary-600",
  },
  {
    id: "job-discovery",
    name: "Smart Job Discovery",
    icon: Search,
    badge: "AI-Powered",
    description:
      "AI-powered job matching that finds opportunities aligned with your skills, experience, and career goals.",
    details: [
      "Intelligent job matching based on your profile",
      "Real-time job alerts for new opportunities",
      "Company culture and fit analysis",
      "Salary range insights",
      "Application success probability scoring",
      "Job market trends and insights",
    ],
    color: "from-secondary-500 to-secondary-600",
  },
  {
    id: "auto-apply",
    name: "Skill-capped Auto Apply",
    icon: Zap,
    badge: "Automated",
    description:
      "Automatically apply to jobs that match your skill level, saving hours of manual work while ensuring quality matches.",
    details: [
      "Automated application submission",
      "Skill-level matching to avoid over/under-qualification",
      "Customizable application templates",
      "Batch application processing",
      "Application status tracking",
      "Smart filtering to avoid duplicate applications",
    ],
    color: "from-cta-500 to-cta-600",
  },
  {
    id: "tracker",
    name: "Application Journey Tracker",
    icon: Target,
    badge: "Tracking",
    description:
      "Track your entire application journey from submission to offer in one centralized dashboard.",
    details: [
      "Visual timeline of all applications",
      "Status updates and notifications",
      "Interview scheduling and reminders",
      "Company and role information",
      "Application analytics and insights",
      "Export data for personal records",
    ],
    color: "from-primary-500 to-secondary-500",
  },
  {
    id: "interview-prep",
    name: "Interview Preparation",
    icon: MessageSquare,
    badge: "AI-Powered",
    description:
      "Comprehensive preparation for technical and HR interviews with AI-powered mock sessions and personalized feedback.",
    details: [
      "AI-powered mock interviews",
      "Technical interview prep for QA and Dev roles",
      "HR interview preparation",
      "Behavioral question practice",
      "Real-time feedback and improvement tips",
      "Interview performance analytics",
    ],
    color: "from-secondary-500 to-primary-500",
  },
  {
    id: "negotiation",
    name: "HR Negotiation Framework",
    icon: Scale,
    badge: "Guided",
    description:
      "Framework and playbooks to negotiate better offers and compensation packages with confidence.",
    details: [
      "Salary negotiation strategies",
      "Benefits negotiation guidance",
      "Offer comparison tools",
      "Market rate analysis",
      "Negotiation script templates",
      "Legal considerations and tips",
    ],
    color: "from-cta-500 to-primary-500",
  },
  {
    id: "legal",
    name: "Legal Readiness Validation",
    icon: Shield,
    badge: "Compliance",
    description:
      "Validate your legal documents and ensure compliance before joining a new role.",
    details: [
      "Document verification checklist",
      "Employment contract review",
      "Legal compliance validation",
      "Notice period calculator",
      "Background check preparation",
      "Legal document templates",
    ],
    color: "from-primary-500 to-secondary-600",
  },
  {
    id: "coding-arena",
    name: "Coding Arena",
    icon: TrendingUp,
    badge: "Practice",
    description:
      "Practice coding challenges and prepare for technical interviews with Game of Coders integration.",
    details: [
      "Coding challenge library",
      "Real-time code execution",
      "Performance tracking",
      "Interview-style problems",
      "Leaderboards and competitions",
      "Progress analytics",
    ],
    color: "from-secondary-500 to-cta-500",
  },
];

export function FeatureDetails() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-8">
          {features.map((feature, index) => {
            const isExpanded = expandedId === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : feature.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${feature.color}`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                          <Sparkles className="h-3 w-3" />
                          {feature.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`ml-4 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pl-16">
                        <ul className="space-y-3">
                          {feature.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-3">
                              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600 dark:bg-primary-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
