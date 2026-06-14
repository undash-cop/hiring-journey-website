"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { AuthErrorNotice } from "@/components/auth/auth-error-notice";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith("/app");

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <AuthErrorNotice />
      </Suspense>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
