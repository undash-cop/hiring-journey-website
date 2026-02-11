"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out Hiring Journey",
    features: [
      "Resume scan (limited)",
      "Job discovery (view only)",
      "Limited AI credits",
      "Invite friends → earn credits",
      "No auto-apply",
      "No negotiation module",
    ],
    cta: "Start Free",
    popular: false,
    badge: "Invite Access",
  },
  {
    name: "Starter",
    price: 299,
    description: "Perfect for getting started",
    features: [
      "3 resume fixes per month",
      "Smart job matching",
      "Limited auto-apply",
      "Interview prep (QA + Tech)",
      "Application tracking",
      "Monthly AI credit cap",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 699,
    description: "For serious job seekers",
    features: [
      "Unlimited resume fixes",
      "Smart job matching",
      "Limited auto-apply",
      "Interview prep (QA + Tech)",
      "Application tracking",
      "Higher AI credit limits",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Elite",
    price: 1199,
    description: "Complete career success",
    features: [
      "Unlimited auto-apply",
      "Coding arena access",
      "HR negotiation playbooks",
      "Legal readiness checks",
      "Priority AI support",
      "Highest credit limits",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

export function PricingPreviewSection() {
  return (
    <div className="py-24 sm:py-32 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400"
          >
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Choose your plan
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Start free with invite access. Upgrade when you&apos;re ready to accelerate your career.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-7xl lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col justify-between rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-800 xl:p-10 ${
                plan.popular
                  ? "bg-primary-600 ring-primary-600 dark:bg-primary-700 dark:ring-primary-700 lg:z-10 lg:rounded-3xl"
                  : "bg-white dark:bg-gray-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={`text-lg font-semibold leading-8 ${
                      plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex gap-2">
                    {plan.popular && (
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold leading-5 text-white">
                        Popular
                      </span>
                    )}
                    {plan.badge && (
                      <span className="rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-xs font-semibold leading-5 text-primary-600 dark:text-primary-400">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  className={`mt-4 text-sm leading-6 ${
                    plan.popular ? "text-primary-100" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={`text-4xl font-display font-bold tracking-tight ${
                      plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.price === 0 ? "Free" : formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span
                      className={`text-sm font-semibold leading-6 ${
                        plan.popular ? "text-primary-100" : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </p>
                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    plan.popular ? "text-white" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className={`h-6 w-6 flex-none ${
                          plan.popular ? "text-white" : "text-primary-600 dark:text-primary-400"
                        }`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/pricing"
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 transition-colors ${
                  plan.popular
                    ? "bg-white text-primary-600 hover:bg-primary-50"
                    : "bg-primary-600 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
                }`}
              >
                {plan.cta}
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/pricing"
            className="text-sm font-semibold leading-6 text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
          >
            View detailed pricing and credit system <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
