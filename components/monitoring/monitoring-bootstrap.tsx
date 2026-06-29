"use client";

import { useEffect } from "react";
import axios from "axios";
import { captureApiError, initClientMonitoring } from "@/lib/monitoring";

let axiosInterceptorInstalled = false;

function installAxiosMonitoring(): void {
  if (axiosInterceptorInstalled) return;
  axiosInterceptorInstalled = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      captureApiError(error, { source: "axios" });
      return Promise.reject(error);
    },
  );
}

export function MonitoringBootstrap() {
  useEffect(() => {
    initClientMonitoring();
    installAxiosMonitoring();
  }, []);

  return null;
}
