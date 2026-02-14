import type { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  "/careers",
  "Careers - Hiring Journey",
  "Join the Hiring Journey team and help transform India's job market."
);

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
