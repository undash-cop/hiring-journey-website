import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppHomePage() {
  const cookieStore = await cookies();
  const hasSession = Boolean(
    cookieStore.get("hj_session")?.value ||
      cookieStore.get("kc_session")?.value ||
      cookieStore.get("access_token")?.value
  );
  redirect(hasSession ? "/app/dashboard" : "/app/login");
}
