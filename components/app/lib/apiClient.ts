import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import keycloak from './keycloak';

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const next = { ...config };
  next.headers = next.headers ?? {};
  if (keycloak.token) {
    next.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return next;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await keycloak.updateToken(-1);
      if (!keycloak.token) {
        return Promise.reject(error);
      }
      originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
      return apiClient(originalRequest);
    } catch {
      const redirectUri =
        typeof window !== 'undefined' ? `${window.location.origin}/app/login` : undefined;
      void keycloak.logout(redirectUri ? { redirectUri } : undefined);
      return Promise.reject(error);
    }
  },
);

export default apiClient;
