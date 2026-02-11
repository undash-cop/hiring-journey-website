"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Perfect for trying out Hiring Journey",
    features: [
      "Resume scan (limited)",
      "Job discovery (view only)",
      "Limited AI credits",
      "Invite friends → earn credits",
      "No auto-apply",
      "No negotiation module",
    ],
    credits: 50,
    cta: "Start Free",
    popular: false,
    badge: "Invite Access",
  },
  {
    name: "Starter",
    price: 299,
    yearlyPrice: 2990,
    description: "Perfect for getting started",
    features: [
      "3 resume fixes per month",
      "Smart job matching (one job title)",
      "Limited auto-apply",
      "Interview prep (QA + Tech)",
      "Application tracking",
      "Monthly AI credit cap",
    ],
    credits: 200,
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 699,
    yearlyPrice: 6990,
    description: "For serious job seekers",
    features: [
      "Unlimited resume fixes",
      "Smart job matching",
      "Limited auto-apply",
      "Interview prep (QA + Tech)",
      "Application tracking",
      "Monthly AI credit cap",
    ],
    credits: 500,
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Elite",
    price: 1199,
    yearlyPrice: 11990,
    description: "Complete career success",
    features: [
      "Unlimited auto-apply",
      "Coding arena access",
      "HR negotiation playbooks",
      "Legal readiness checks",
      "Priority AI support",
      "Highest credit limits",
    ],
    credits: 1000,
    cta: "Go Elite",
    popular: false,
  },
];

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const savings = (monthly: number, yearly: number) => {
    const monthlyTotal = monthly * 12;
    return Math.round(((monthlyTotal - yearly) / monthlyTotal) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-primary-600 dark:text-primary-400">
                Save up to 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-none lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {plans.map((plan, index) => {
            const displayPrice = billingCycle === "yearly" ? plan.yearlyPrice : plan.price;
            const monthlyEquivalent = billingCycle === "yearly" ? Math.round(plan.yearlyPrice / 12) : plan.price;
            const showSavings = billingCycle === "yearly" && plan.price > 0;

            return (
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
                  <p
                    className={`mt-4 text-sm leading-6 ${
                      plan.popular ? "text-primary-100" : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <p className="flex items-baseline gap-x-1">
                      <span
                        className={`text-4xl font-display font-bold tracking-tight ${
                          plan.popular ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {plan.price === 0 ? "Free" : formatCurrency(displayPrice)}
                      </span>
                      {plan.price > 0 && (
                        <span
                          className={`text-sm font-semibold leading-6 ${
                            plan.popular ? "text-primary-100" : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          /{billingCycle === "yearly" ? "year" : "month"}
                        </span>
                      )}
                    </p>
                    {showSavings && (
                      <p className="mt-2 text-sm text-primary-600 dark:text-primary-400 font-semibold">
                        Save {savings(plan.price, plan.yearlyPrice)}% • {formatCurrency(monthlyEquivalent)}/month
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      <span
                        className={plan.popular ? "text-primary-100" : "text-gray-600 dark:text-gray-300"}
                      >
                        {plan.credits} AI credits/month
                      </span>
                    </div>
                  </div>
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
                  href="/auth/signup"
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 transition-colors ${
                    plan.popular
                      ? "bg-white text-primary-600 hover:bg-primary-50"
                      : plan.price === 0
                      ? "bg-primary-600 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
                      : "bg-primary-600 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
