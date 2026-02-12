"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Settings, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/" className="flex-shrink-0">
                <Logo width={28} height={28} variant="monochrome" className="h-7" />
              </Link>
              <div className="hidden lg:block h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block"
              >
                <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Welcome back! Here&apos;s your hiring journey overview.
                </p>
              </motion.div>
              <div className="lg:hidden">
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <Link
                href="/dashboard/settings"
                className="rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
