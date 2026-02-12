import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
});

// Using Inter for both sans and display fonts
// Satoshi can be added later by downloading from fontshare.com
const satoshi = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
});

const metadataBase = process.env.NEXT_PUBLIC_APP_URL 
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : new URL("https://hiringjourney.com");

export const metadata: Metadata = {
  metadataBase,
  title: "Hiring Journey - Your Complete Career Success Platform",
  description:
    "End-to-end guided hiring journey: Resume → Jobs → Interviews → Offers → Negotiation → Legal readiness. Built for India's job seekers.",
  keywords: [
    "job search",
    "resume builder",
    "interview preparation",
    "career guidance",
    "India jobs",
    "AI resume",
    "job application",
  ],
  authors: [{ name: "Undash-cop Private Limited" }],
  icons: {
    icon: "/logos/Hiring_Journey_Primary.svg",
    apple: "/logos/Hiring_Journey_Primary.svg",
  },
  openGraph: {
    title: "Hiring Journey - Your Complete Career Success Platform",
    description:
      "End-to-end guided hiring journey for India's job seekers. AI-powered resume optimization, smart job matching, and interview preparation.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logos/Hiring_Journey_Primary.svg",
        width: 1200,
        height: 630,
        alt: "Hiring Journey Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiring Journey - Your Complete Career Success Platform",
    description:
      "End-to-end guided hiring journey for India's job seekers.",
    images: ["/logos/Hiring_Journey_Primary.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${satoshi.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
