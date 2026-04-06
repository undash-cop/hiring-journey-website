import { redirect } from "next/navigation";

export default function AppAdminIndexPage() {
  redirect("/app/admin/dashboard");
}
