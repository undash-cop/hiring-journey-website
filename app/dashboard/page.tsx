import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  // SSR: user-specific, auth-gated data should not be statically cached.
  const isAuthenticated = true;
  if (!isAuthenticated) redirect("/auth/login");
  return {
    profileCompletion: 82,
    applications: 14,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Profile completion: {data.profileCompletion}%</p>
      <p className="text-gray-600 dark:text-gray-300">Tracked applications: {data.applications}</p>
    </main>
  );
}
