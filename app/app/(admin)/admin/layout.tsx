"use client";

import type { ReactNode } from "react";
import AdminLayout from "@/components/app/layouts/AdminLayout";

export default function AdminAppLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
