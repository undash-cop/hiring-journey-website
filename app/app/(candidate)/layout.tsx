"use client";

import type { ReactNode } from "react";
import ProtectedRoute from "@/components/app/components/ProtectedRoute";
import CandidateLayout from "@/components/app/layouts/CandidateLayout";

export default function CandidateAppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <CandidateLayout>{children}</CandidateLayout>
    </ProtectedRoute>
  );
}
