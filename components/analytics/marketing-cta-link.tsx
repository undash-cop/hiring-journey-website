"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { analytics } from "@/lib/analytics";
import { MARKETING_CTAS } from "@/lib/marketing-nav";

type MarketingCtaKind = "signup" | "login" | "pricing";

type MarketingCtaLinkProps = {
  href: string;
  source: string;
  kind?: MarketingCtaKind;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function trackMarketingCta(kind: MarketingCtaKind, source: string): void {
  if (kind === "signup") analytics.clickSignup(source);
  else if (kind === "login") analytics.clickLogin(source);
  else analytics.clickPricing();
}

export function MarketingCtaLink({
  href,
  source,
  kind = "signup",
  className,
  children,
  onClick,
}: MarketingCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackMarketingCta(kind, source);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

export function marketingSignupHref(): string {
  return MARKETING_CTAS.signup;
}
