"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { initClientMonitoring } from "@/lib/monitoring";

initClientMonitoring();
