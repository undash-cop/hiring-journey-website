"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Mail, Github } from "lucide-react";

// Mock team data - Replace with real team members
const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "Co-Founder & CEO",
    bio: "Former product leader at top Indian tech companies. Passionate about democratizing career success.",
    image: "👨‍💼",
    linkedin: "#",
    email: "rajesh@hiringjourney.com",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    bio: "AI/ML expert with 10+ years building scalable products. Led AI teams at Fortune 500 companies.",
    image: "👩‍💻",
    linkedin: "#",
    email: "priya@hiringjourney.com",
  },
  {
    name: "Amit Verma",
    role: "Head of Product",
    bio: "Product strategist focused on user experience. Previously built career products used by millions.",
    image: "👨‍💼",
    linkedin: "#",
    email: "amit@hiringjourney.com",
  },
  {
    name: "Sneha Reddy",
    role: "Head of Growth",
    bio: "Growth marketer with expertise in India's job market. Helped scale multiple B2C products.",
    image: "👩‍💼",
    linkedin: "#",
    email: "sneha@hiringjourney.com",
  },
];

export function TeamSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            A passionate team dedicated to transforming India&apos;s job market
          </motion.p>
        </div>

        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-3xl">
                    {member.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{member.role}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We&apos;re growing! Join us in transforming careers across India.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            View Open Positions
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
