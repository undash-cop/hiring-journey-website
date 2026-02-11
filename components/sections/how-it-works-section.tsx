"use client";

import { motion } from "framer-motion";
import { FileText, Search, MessageSquare, Handshake, CheckCircle } from "lucide-react";

const steps = [
  {
    name: "Resume Optimization",
    description: "Upload your resume and let AI optimize it for your target role. Get role-specific suggestions and improvements.",
    icon: FileText,
    step: "01",
  },
  {
    name: "Job Discovery",
    description: "Our AI matches you with relevant job opportunities based on your skills, experience, and career goals.",
    icon: Search,
    step: "02",
  },
  {
    name: "Auto Apply",
    description: "Set your preferences and let our system automatically apply to matching jobs. Track everything in one place.",
    icon: CheckCircle,
    step: "03",
  },
  {
    name: "Interview Prep",
    description: "Prepare for technical and HR interviews with AI-powered mock sessions and personalized feedback.",
    icon: MessageSquare,
    step: "04",
  },
  {
    name: "Negotiation & Legal",
    description: "Get frameworks for salary negotiation and ensure legal readiness before accepting offers.",
    icon: Handshake,
    step: "05",
  },
];

export function HowItWorksSection() {
  return (
    <div id="how-it-works" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            Simple process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            How it works
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Your complete hiring journey in five simple steps. We guide you from resume to offer.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                    {step.step}
                  </div>
                  <step.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto font-semibold text-gray-900 dark:text-white mb-2">{step.name}</p>
                  <p className="flex-auto">{step.description}</p>
                </dd>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-[calc(50%+2rem)] top-0 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                )}
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
