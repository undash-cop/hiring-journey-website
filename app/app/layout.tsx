import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./app.css";
import { AppShellProviders } from "@/components/app/app-shell-providers";

export const metadata: Metadata = {
  title: { default: "Hiring Journey App", template: "%s · Hiring Journey" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppShellProviders>{children}</AppShellProviders>
    </div>
  );
}
