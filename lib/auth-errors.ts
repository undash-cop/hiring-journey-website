export type AuthErrorCode =
  | "auth_failed"
  | "callback_missing_code"
  | "callback_exchange_failed"
  | "session_expired";

const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  auth_failed: "Sign-in could not be completed. Please try again.",
  callback_missing_code: "Sign-in was interrupted before completion. Please try again.",
  callback_exchange_failed: "We could not verify your sign-in with Keycloak. Please try again.",
  session_expired: "Your session expired. Please sign in again.",
};

export function getAuthErrorMessage(code: string | null | undefined): string | null {
  if (!code) return null;
  if (code in AUTH_ERROR_MESSAGES) {
    return AUTH_ERROR_MESSAGES[code as AuthErrorCode];
  }
  return AUTH_ERROR_MESSAGES.auth_failed;
}

export function parseAuthErrorParam(value: string | null): AuthErrorCode | null {
  if (!value) return null;
  if (value in AUTH_ERROR_MESSAGES) {
    return value as AuthErrorCode;
  }
  return value === "auth_failed" ? "auth_failed" : null;
}

/** Record auth failures for debugging and Sentry. */
export function reportAuthError(
  code: AuthErrorCode,
  detail?: Record<string, unknown>,
): void {
  const payload = { code, at: new Date().toISOString(), ...detail };

  if (process.env.NODE_ENV !== "production") {
    console.error("[auth]", payload);
  }

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem("hj_last_auth_error", JSON.stringify(payload));
    } catch {
      // ignore quota / private mode
    }
  }

  void import("@/lib/monitoring").then(({ captureMessage }) => {
    captureMessage(`auth:${code}`, payload);
  });
}
