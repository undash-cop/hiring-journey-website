import { DashboardLoadingSkeleton } from "@/components/dashboard/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <DashboardLoadingSkeleton />
      </div>
    </div>
  );
}
