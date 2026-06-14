"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/marketing-faq";

export function FaqAccordion({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          className="rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <span className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
