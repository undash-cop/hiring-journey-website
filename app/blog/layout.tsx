import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Hiring Journey",
  description: "Career tips, job search advice, and insights from Hiring Journey.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
