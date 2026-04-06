type ApiRequestOptions = RequestInit & {
  token?: string;
  retries?: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const REFRESH_ENDPOINT = "/auth/refresh";

async function request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { token, retries = 1, headers, ...rest } = options;
  const target = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const response = await fetch(target, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
    cache: "no-store",
    credentials: "include",
  });

  if (response.status === 401 && retries > 0) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return request<T>(path, { ...options, retries: retries - 1, token: refreshed });
    }
  }

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}) ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function refreshToken(): Promise<string | null> {
  try {
    const target = `${API_BASE_URL}${REFRESH_ENDPOINT}`;
    const res = await fetch(target, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { accessToken?: string };
    return data.accessToken ?? null;
  } catch {
    return null;
  }
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>(path, { ...(options ?? {}), method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, {
      ...(options ?? {}),
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, {
      ...(options ?? {}),
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, {
      ...(options ?? {}),
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>(path, { ...(options ?? {}), method: "DELETE" }),
};
