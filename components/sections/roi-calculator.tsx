"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react";

export function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(10);
  const [salaryIncrease, setSalaryIncrease] = useState(20);

  const monthlyValue = (hoursSaved * 500 * 4) + (salaryIncrease * 1000); // ₹500/hour * 4 weeks + salary increase
  const yearlyValue = monthlyValue * 12;
  const roi = ((yearlyValue - 8388) / 8388) * 100; // Assuming Pro plan ₹699/month

  return (
    <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-cta-50 dark:from-primary-950/20 dark:via-secondary-950/20 dark:to-cta-950/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Calculate Your ROI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            See how much time and money Hiring Journey can save you
          </motion.p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white dark:bg-gray-950 p-8 ring-1 ring-gray-200 dark:ring-gray-800"
            >
              <div className="mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Inputs</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Hours saved per week with auto-apply
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={hoursSaved}
                      onChange={(e) => setHoursSaved(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white w-12 text-right">
                      {hoursSaved}h
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Average user saves 10+ hours per week
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Expected salary increase (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={salaryIncrease}
                      onChange={(e) => setSalaryIncrease(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white w-12 text-right">
                      {salaryIncrease}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Better negotiation leads to higher offers
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 p-8 text-white"
            >
              <h3 className="text-xl font-semibold mb-6">Your Returns</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Time Saved (Monthly)</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {hoursSaved * 4}h
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-sm">Value Created (Yearly)</span>
                  </div>
                  <span className="text-2xl font-bold">
                    ₹{yearlyValue.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/20 p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-semibold">ROI</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {roi > 0 ? "+" : ""}{roi.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-white/10 p-4 text-sm">
                <p className="text-primary-100">
                  Based on ₹500/hour value of your time and {salaryIncrease}% salary increase from better negotiation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
