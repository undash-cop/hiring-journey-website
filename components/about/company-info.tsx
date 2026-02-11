"use client";

import { motion } from "framer-motion";
import { Building2, Heart } from "lucide-react";
import { Logo } from "@/components/logo";

export function CompanyInfo() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 lg:p-12"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Logo width={40} height={40} variant="primary" className="h-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  Built by Undash-cop Private Limited
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Hiring Journey is a product of Undash-cop Private Limited, a company dedicated to building
                  innovative solutions for India&apos;s workforce. We combine cutting-edge AI technology with deep
                  understanding of the Indian job market to create tools that truly make a difference.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Heart className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  <span>Made with ❤️ in India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
