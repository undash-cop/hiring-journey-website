import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ResumeManagement } from "@/components/dashboard/resume-management";

export const metadata = {
  title: "Resume Management - Dashboard | Hiring Journey",
  description: "Manage and optimize your resumes for different job roles.",
};

export const dynamic = "force-dynamic";

export default function ResumePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <ResumeManagement />
      </div>
    </div>
  );
}
