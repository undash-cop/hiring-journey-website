import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ApplicationsTracker } from "@/components/dashboard/applications-tracker";

export const metadata = {
  title: "Application Tracker - Dashboard | Hiring Journey",
  description: "Track all your job applications in one place.",
};

export const dynamic = "force-dynamic";

export default function ApplicationsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <ApplicationsTracker />
      </div>
    </div>
  );
}
