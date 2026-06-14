"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { exchangeKeycloakCallback } from "@/lib/keycloak";
import { reportAuthError } from "@/lib/auth-errors";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [label] = useState("Signing you in…");

  useEffect(() => {
    void exchangeKeycloakCallback()
      .then((href) => {
        router.replace(href);
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "auth_failed";
        const code =
          message === "auth_failed" ? "callback_exchange_failed" : "auth_failed";
        reportAuthError(code, {
          path: window.location.pathname,
          search: window.location.search,
        });
        router.replace("/?error=auth_failed");
      });
  }, [router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent dark:border-primary-400"
        aria-hidden
      />
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}
