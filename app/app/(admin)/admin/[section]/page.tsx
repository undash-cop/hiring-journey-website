 "use client";

import { use, useEffect, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/app/features/admin/dashboard/AdminDashboard";
import AdminJobsPage from "@/components/app/features/admin/jobs/AdminJobsPage";
import PublishJobPage from "@/components/app/features/admin/publish/PublishJobPage";
import ApplicationsPage from "@/components/app/features/admin/applications/ApplicationsPage";
import CandidatesPage from "@/components/app/features/admin/candidates/CandidatesPage";
import AnalyticsPage from "@/components/app/features/admin/analytics/AnalyticsPage";
import AuditLogsPage from "@/components/app/features/admin/audit/AuditLogsPage";
import PlansPage from "@/components/app/features/admin/plans/PlansPage";
import AdminSettingsPage from "@/components/app/features/admin/settings/SettingsPage";

const adminRouteMap: Record<string, ComponentType> = {
  dashboard: AdminDashboard,
  jobs: AdminJobsPage,
  publish: PublishJobPage,
  applications: ApplicationsPage,
  candidates: CandidatesPage,
  analytics: AnalyticsPage,
  audit: AuditLogsPage,
  plans: PlansPage,
  settings: AdminSettingsPage,
};

type AdminSectionPageProps = {
  params: Promise<{ section: string }>;
};

export default function AdminSectionPage({ params }: AdminSectionPageProps) {
  const router = useRouter();
  const { section: rawSection } = use(params);
  const section = decodeURIComponent(rawSection).toLowerCase();
  const Component = adminRouteMap[section];
  useEffect(() => {
    if (!Component) {
      router.replace("/app/admin/dashboard");
    }
  }, [Component, router]);
  if (!Component) return null;
  return <Component />;
}
