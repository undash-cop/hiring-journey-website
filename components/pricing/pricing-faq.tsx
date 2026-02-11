"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is invite-based access?",
    answer:
      "Free plan users need an invite code to sign up. You can get an invite from existing users or request one through our waitlist. Invite friends to earn bonus credits!",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.",
  },
  {
    question: "What happens if I run out of credits?",
    answer:
      "You can purchase additional credits anytime, or upgrade to a higher plan for more monthly credits. We'll notify you when you're running low.",
  },
  {
    question: "Do credits roll over?",
    answer:
      "No, credits reset monthly on your billing date. Unused credits don't roll over, so make sure to use them!",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, and net banking. All payments are processed securely through our payment partners.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Start with our Free plan using invite access. No credit card required. You can upgrade anytime when you're ready.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Cancel your subscription anytime from your dashboard. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What's the difference between Starter and Pro?",
    answer:
      "Pro includes unlimited resume fixes and higher credit limits, while Starter is limited to 3 resume fixes per month. Both include interview prep and job matching.",
  },
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Everything you need to know about our pricing and credit system.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
