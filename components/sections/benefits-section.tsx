"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Zap, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "5x Faster Applications",
    description: "Automated job applications save hours of manual work",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: TrendingUp,
    title: "3x More Interviews",
    description: "AI-optimized resumes get more responses from employers",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your data is encrypted and protected with industry standards",
    color: "from-cta-500 to-cta-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help whenever you need it, day or night",
    color: "from-primary-500 to-secondary-500",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Access to career coaches and industry experts",
    color: "from-secondary-500 to-cta-500",
  },
  {
    icon: CheckCircle,
    title: "Money-Back Guarantee",
    description: "Not satisfied? Get a full refund within 30 days",
    color: "from-primary-600 to-secondary-600",
  },
];

export function BenefitsSection() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Why Choose Hiring Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            We&apos;re not just another job portal. We&apos;re your complete career success partner.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-white dark:bg-gray-950 p-6 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-lg transition-all"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${benefit.color} group-hover:scale-110 transition-transform`}>
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
