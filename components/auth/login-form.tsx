"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { redirectToLogin } from "@/lib/keycloak";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSignIn = () => {
    setIsLoading(true);
    void redirectToLogin()
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Could not start sign-in.";
        addToast(msg, "error");
        setIsLoading(false);
      });
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        You will be redirected to our secure sign-in page to continue.
      </p>

      {isLoading && (
        <div className="rounded-md bg-primary-50 dark:bg-primary-900/20 p-4">
          <p className="text-sm text-primary-800 dark:text-primary-200">Redirecting to sign in…</p>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Signing in..." : "Sign in"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm leading-6">
          <span className="bg-white dark:bg-gray-950 px-6 text-gray-900 dark:text-gray-100">Or continue with</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          className="flex w-full justify-center items-center gap-3 rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/auth/forgot-password"
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Forgot password?
        </Link>
      </p>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/app/signup"
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
