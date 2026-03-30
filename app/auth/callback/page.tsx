"use client";

import { useEffect, useState } from "react";
import { exchangeKeycloakCallback } from "@/lib/keycloak";

export default function AuthCallbackPage() {
  const [label] = useState("Signing you in…");

  useEffect(() => {
    void exchangeKeycloakCallback().catch(() => {
      window.location.replace("/?error=auth_failed");
    });
  }, []);

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
