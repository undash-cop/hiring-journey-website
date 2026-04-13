"use client";

import { useEffect } from "react";
import { redirectToRegister } from "@/lib/keycloak";

export default function AppSignupPage() {
  useEffect(() => {
    void redirectToRegister();
  }, []);

  return null;
}
