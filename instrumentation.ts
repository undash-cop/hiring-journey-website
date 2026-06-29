import * as Sentry from "@sentry/nextjs";
import { initServerMonitoring } from "@/lib/monitoring";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await initServerMonitoring();
  }
}

export const onRequestError = Sentry.captureRequestError;
