"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Zap, Users } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected",
    color: "text-primary-600 dark:text-primary-400",
  },
  {
    icon: Lock,
    title: "GDPR Compliant",
    description: "Full compliance with data protection laws",
    color: "text-secondary-600 dark:text-secondary-400",
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description: "Latest AI technology for better results",
    color: "text-cta-600 dark:text-cta-400",
  },
  {
    icon: Users,
    title: "50K+ Users",
    description: "Trusted by job seekers across India",
    color: "text-primary-600 dark:text-primary-400",
  },
];

export function TrustBadges() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <badge.icon className={`mx-auto h-8 w-8 ${badge.color} mb-3`} />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{badge.title}</h3>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
