import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { InterviewPrep } from "@/components/dashboard/interview-prep";

export const metadata = {
  title: "Interview Preparation - Dashboard | Hiring Journey",
  description: "Prepare for your upcoming interviews with AI-powered mock sessions.",
};

export const dynamic = "force-dynamic";

export default function InterviewsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <InterviewPrep />
      </div>
    </div>
  );
}
