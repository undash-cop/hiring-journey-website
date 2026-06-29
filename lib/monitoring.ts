/**
 * Error monitoring (Sentry when DSN is set). Safe no-op in dev without configuration.
 */

export type MonitoringUser = {
  id: string;
  email?: string;
  username?: string;
};

type MonitoringContext = Record<string, unknown>;

function clientDsn(): string | undefined {
  return process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || undefined;
}

function serverDsn(): string | undefined {
  return process.env.SENTRY_DSN?.trim() || clientDsn();
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function monitoringEnabled(): boolean {
  return Boolean(isBrowser() ? clientDsn() : serverDsn());
}

function tracesSampleRate(): number {
  const raw = process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? process.env.SENTRY_TRACES_SAMPLE_RATE;
  const parsed = raw ? Number.parseFloat(raw) : 0.1;
  return Number.isFinite(parsed) ? parsed : 0.1;
}

function environment(): string {
  return (
    process.env.NEXT_PUBLIC_APP_ENV?.trim() ||
    process.env.APP_ENV?.trim() ||
    process.env.NODE_ENV ||
    "development"
  );
}

async function getSentry() {
  return import("@sentry/nextjs");
}

export async function initServerMonitoring(): Promise<void> {
  const dsn = serverDsn();
  if (!dsn) return;

  const Sentry = await getSentry();
  if (Sentry.getClient()) return;

  Sentry.init({
    dsn,
    environment: environment(),
    tracesSampleRate: tracesSampleRate(),
    sendDefaultPii: false,
  });
}

export function initClientMonitoring(): void {
  const dsn = clientDsn();
  if (!dsn || !isBrowser()) return;

  void getSentry().then((Sentry) => {
    if (Sentry.getClient()) return;
    Sentry.init({
      dsn,
      environment: environment(),
      tracesSampleRate: tracesSampleRate(),
      sendDefaultPii: false,
    });
  });
}

export function captureException(error: unknown, context?: MonitoringContext): void {
  if (!monitoringEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[monitoring]", error, context);
    }
    return;
  }

  void getSentry().then((Sentry) => {
    Sentry.withScope((scope) => {
      if (context) scope.setContext("details", context);
      Sentry.captureException(error);
    });
  });
}

export function captureMessage(message: string, context?: MonitoringContext): void {
  if (!monitoringEnabled()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[monitoring]", message, context);
    }
    return;
  }

  void getSentry().then((Sentry) => {
    Sentry.withScope((scope) => {
      if (context) scope.setContext("details", context);
      Sentry.captureMessage(message, "warning");
    });
  });
}

export function setMonitoringUser(user: MonitoringUser | null): void {
  if (!monitoringEnabled()) return;

  void getSentry().then((Sentry) => {
    Sentry.setUser(
      user
        ? {
            id: user.id,
            email: user.email,
            username: user.username,
          }
        : null,
    );
  });
}

export function shouldReportApiError(status?: number): boolean {
  if (status == null) return true;
  if (status === 401 || status === 403 || status === 404 || status === 422) return false;
  return status >= 500;
}

export function captureApiError(error: unknown, context?: MonitoringContext): void {
  if (!axiosLikeError(error)) {
    captureException(error, context);
    return;
  }

  const status = error.response?.status;
  if (!shouldReportApiError(status)) return;

  captureException(error, {
    ...context,
    api_status: status,
    api_url: error.config?.url,
    api_method: error.config?.method,
  });
}

type AxiosLikeError = {
  response?: { status?: number };
  config?: { url?: string; method?: string };
};

function axiosLikeError(error: unknown): error is AxiosLikeError {
  return typeof error === "object" && error !== null && ("response" in error || "config" in error);
}
