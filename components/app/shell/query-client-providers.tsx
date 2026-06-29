"use client";

import { QueryCache, QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { captureApiError } from "@/lib/monitoring";
import { ToastProvider } from "../contexts/ToastContext";
import { ErrorBoundary } from "../components/ErrorBoundary";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => captureApiError(error, { source: "react_query" }),
  }),
  mutationCache: new MutationCache({
    onError: (error) => captureApiError(error, { source: "react_query_mutation" }),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function AppQueryProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
