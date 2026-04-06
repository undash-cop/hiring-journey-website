"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/app/context/AuthContext";
import { AppQueryProviders } from "@/components/app/shell/query-client-providers";

export function AppShellProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppQueryProviders>{children}</AppQueryProviders>
    </AuthProvider>
  );
}
