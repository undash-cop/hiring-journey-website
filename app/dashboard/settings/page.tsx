import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SettingsPanel } from "@/components/dashboard/settings-panel";

export const metadata = {
  title: "Settings - Dashboard | Hiring Journey",
  description: "Manage your account settings and preferences.",
};

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <SettingsPanel />
      </div>
    </div>
  );
}
