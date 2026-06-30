"use client";

import { useEffect } from "react";
import {
  redirectToGoogleAuth,
  redirectToLogin,
  redirectToRegister,
} from "@/lib/keycloak";
import { isGoogleOAuthEnabled } from "@/lib/feature-flags";
import { analytics } from "@/lib/analytics";

type AuthEntryMode = "login" | "signup";

export function AuthEntryScreen({ mode }: { mode: AuthEntryMode }) {
  const googleEnabled = isGoogleOAuthEnabled();

  useEffect(() => {
    if (!googleEnabled) {
      if (mode === "login") {
        void redirectToLogin();
      } else {
        void redirectToRegister();
      }
    }
  }, [googleEnabled, mode]);

  if (!googleEnabled) {
    return null;
  }

  const title = mode === "login" ? "Sign in to Hiring Journey" : "Create your Hiring Journey account";
  const subtitle =
    mode === "login"
      ? "Continue with Google or use your email via our secure sign-in page."
      : "Get started with Google or register with email.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              if (mode === "login") analytics.googleSignIn();
              else analytics.googleSignUp();
              void redirectToGoogleAuth(mode);
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span aria-hidden>G</span>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => {
              if (mode === "login") void redirectToLogin();
              else void redirectToRegister();
            }}
            className="w-full rounded-lg bg-gray-900 dark:bg-gray-100 px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
          >
            Continue with email
          </button>
        </div>
      </div>
    </div>
  );
}
