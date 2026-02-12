import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Hiring Journey",
  description: "Join the Hiring Journey team and help transform India's job market.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
