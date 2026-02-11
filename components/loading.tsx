"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </motion.div>
    </div>
  );
}
