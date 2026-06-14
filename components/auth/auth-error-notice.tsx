"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAuthErrorMessage, parseAuthErrorParam } from "@/lib/auth-errors";

export function AuthErrorNotice() {
  const searchParams = useSearchParams();
  const code = parseAuthErrorParam(searchParams.get("error"));
  const message = getAuthErrorMessage(code);

  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-100"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>{message}</p>
        <Link
          href="/app/login"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        >
          Try signing in again
        </Link>
      </div>
    </div>
  );
}
