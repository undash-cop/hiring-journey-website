"use client";

import { useEffect } from "react";
import { redirectToLogin } from "@/lib/keycloak";

export default function AppLoginPage() {
  useEffect(() => {
    void redirectToLogin();
  }, []);

  return null;
}
