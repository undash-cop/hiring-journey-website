"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f9fafb",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1.5rem" }}>
            We have been notified. Please try again or return to the home page.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button type="button" onClick={() => reset()}>
              Try again
            </button>
            <button type="button" onClick={() => (window.location.href = "/")}>
              Go home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
