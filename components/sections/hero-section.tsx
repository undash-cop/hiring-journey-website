"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50/50 dark:from-primary-950/20 pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-secondary-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-24 sm:mt-32 lg:mt-16"
          >
            <div className="mb-8 flex items-center gap-x-4">
              <span className="relative flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm leading-6 text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-600/10 dark:ring-primary-400/20">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">AI-Powered Career Platform</span>
              </span>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-balance">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Hiring Journey
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 text-balance">
              From resume optimization to job offers—we guide you through every step. Built for India&apos;s job seekers
              with AI-powered tools that get you hired faster.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors flex items-center gap-2"
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-x-2">
                <div className="h-2 w-2 rounded-full bg-secondary-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="h-2 w-2 rounded-full bg-secondary-500" />
                <span>Invite-based access</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none"
          >
            <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-100/10">
                {/* Dashboard Preview Mockup */}
                <div className="h-full p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950/50 dark:to-primary-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Resume Score</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">78</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                          <div className="h-5 w-5 rounded bg-primary-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-950/50 dark:to-secondary-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Applications</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                          <div className="h-5 w-5 rounded bg-secondary-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Credits</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">145/200</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '72.5%' }}></div>
                    </div>
                  </div>
                  
                  {/* Timeline Preview */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Activity</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-1"></div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-secondary-500"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-1"></div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
