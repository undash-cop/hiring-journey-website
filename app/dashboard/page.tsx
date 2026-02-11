import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets";

export const metadata = {
  title: "Dashboard - Hiring Journey",
  description: "Your Hiring Journey dashboard - track applications, credits, and progress.",
};

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <DashboardWidgets />
    </div>
  );
}
