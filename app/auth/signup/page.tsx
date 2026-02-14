import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { LogoServer } from "@/components/logo-server";

import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/auth/signup",
  "Sign Up - Hiring Journey",
  "Create your Hiring Journey account and start your career success journey. Invite code required for free access."
);

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="flex justify-center mb-8">
          <LogoServer width={40} height={40} variant="primary" className="h-12" />
        </Link>
        <h2 className="text-center text-2xl font-display font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Start your hiring journey today. Invite code required for free access.
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
