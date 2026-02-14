import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { LogoServer } from "@/components/logo-server";

import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/auth/login",
  "Login - Hiring Journey",
  "Sign in to your Hiring Journey account to continue your career success journey."
);

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="flex justify-center mb-8">
          <LogoServer width={40} height={40} variant="primary" className="h-12" />
        </Link>
        <h2 className="text-center text-2xl font-display font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
