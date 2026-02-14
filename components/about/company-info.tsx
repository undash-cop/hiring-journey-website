"use client";

import { motion } from "framer-motion";
import { Building2, Heart, MapPin, Mail, Phone, Globe, Award, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";

type CompanyDetail = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
};

const companyDetails: CompanyDetail[] = [
  {
    icon: Building2,
    label: "Company Name",
    value: "Undash-cop Private Limited",
    href: "https://undash-cop.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
  },
  {
    icon: Users,
    label: "Team Size",
    value: "50+ Employees",
  },
  {
    icon: Award,
    label: "Founded",
    value: "2023",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@hiringjourney.com",
    href: "mailto:hello@hiringjourney.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-8660-158001",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.hiringjourney.com",
    href: "https://hiringjourney.com",
  },
];

export function CompanyInfo() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Main Company Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 lg:p-12 mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <Logo width={80} height={80} variant="primary" className="h-20" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Built by{" "}
                  <a
                    href="https://undash-cop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors underline decoration-2 underline-offset-4"
                  >
                    Undash-cop Private Limited
                  </a>
                </h3>
                <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-6">
                  Hiring Journey is a product of{" "}
                  <a
                    href="https://undash-cop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-semibold"
                  >
                    Undash-cop Private Limited
                  </a>
                  , a company dedicated to building innovative solutions for India&apos;s workforce. We combine cutting-edge AI technology with deep
                  understanding of the Indian job market to create tools that truly make a difference.
                </p>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400 mb-6">
                  Our mission is to democratize career success by making professional-grade tools accessible to every
                  job seeker, regardless of their background, location, or experience level. We believe that everyone
                  deserves a fair chance to build a successful career.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                  <Heart className="h-5 w-5" />
                  <span>Made with ❤️ in India, for India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {companyDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <detail.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{detail.label}</span>
                </div>
                {detail.href ? (
                  <a
                    href={detail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{detail.value}</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 p-8 ring-1 ring-primary-200 dark:ring-primary-800"
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-white dark:bg-gray-950 p-4 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 transition-all group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <contact.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">{contact.label}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{contact.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-primary-200 dark:border-primary-800">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Visit Contact Page
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
