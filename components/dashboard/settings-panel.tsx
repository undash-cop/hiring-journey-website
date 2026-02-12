"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Shield, Trash2, Save } from "lucide-react";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    email: "user@example.com",
    name: "John Doe",
    notifications: true,
    emailUpdates: true,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm dark:bg-gray-900 dark:text-white dark:ring-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm dark:bg-gray-900 dark:text-white dark:ring-gray-700"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
              <Bell className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">Email Updates</span>
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={(e) => setSettings({ ...settings, emailUpdates: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
              />
            </label>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cta-100 dark:bg-cta-900/30">
              <CreditCard className="h-5 w-5 text-cta-600 dark:text-cta-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Pro Plan</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">₹699/month</p>
            </div>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
              Manage Subscription
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white dark:bg-gray-950 p-6 shadow-sm ring-1 ring-red-200 dark:ring-red-900/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Danger Zone</h3>
          </div>
          <div className="space-y-4">
            <button className="flex items-center gap-2 rounded-md border border-red-300 dark:border-red-800 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
