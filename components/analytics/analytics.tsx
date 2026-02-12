"use client";

import { GoogleAnalytics } from "./google-analytics";
import { PlausibleAnalytics } from "./plausible-analytics";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {plausibleDomain && <PlausibleAnalytics domain={plausibleDomain} />}
    </>
  );
}
