"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { TrustBadges } from "@/components/sections/trust-badges";

export function CTASection() {
  return (
    <>
      <TrustBadges />
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-700 dark:via-primary-800 dark:to-secondary-700 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm leading-6 text-white ring-1 ring-inset ring-white/20"
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">Join 50,000+ Job Seekers</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl"
            >
              Ready to start your hiring journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100"
            >
              Join thousands of job seekers who are accelerating their careers with AI-powered tools. Start free with
              invite access.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-100"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
            >
              <Link
                href="/auth/signup"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-primary-600 shadow-lg hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105 flex items-center gap-2"
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="rounded-md bg-white/10 px-8 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-all"
              >
                View Pricing
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
