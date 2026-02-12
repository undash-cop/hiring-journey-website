"use client";

// Simple toast utility that can be used throughout the app
// For a more robust solution, consider using react-hot-toast or sonner

let toastHandler: ((message: string, type?: "success" | "error" | "info" | "warning") => void) | null = null;

export function setToastHandler(handler: (message: string, type?: "success" | "error" | "info" | "warning") => void) {
  toastHandler = handler;
}

export function toast(message: string, type: "success" | "error" | "info" | "warning" = "info") {
  if (toastHandler) {
    toastHandler(message, type);
  } else {
    // Fallback to console if toast provider not initialized
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}
