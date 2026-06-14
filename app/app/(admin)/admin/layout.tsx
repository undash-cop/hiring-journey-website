"use client";

import type { ReactNode } from "react";
import ProtectedRoute from "@/components/app/components/ProtectedRoute";
import RealmRoleRoute from "@/components/app/components/RealmRoleRoute";
import AdminLayout from "@/components/app/layouts/AdminLayout";

export default function AdminAppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <RealmRoleRoute roles={["admin"]}>
        <AdminLayout>{children}</AdminLayout>
      </RealmRoleRoute>
    </ProtectedRoute>
  );
}
