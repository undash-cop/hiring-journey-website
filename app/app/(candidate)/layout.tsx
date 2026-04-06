"use client";

import type { ReactNode } from "react";
import CandidateLayout from "@/components/app/layouts/CandidateLayout";

export default function CandidateAppLayout({ children }: { children: ReactNode }) {
  return <CandidateLayout>{children}</CandidateLayout>;
}
