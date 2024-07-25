"use client";

import { useReportWebVitals } from "next/web-vitals";
const gtmId = process.env.NEXT_PUBLIC_GA_ID || "";
export function WebVitals() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      event_label: metric.id,
      non_interaction: true,
      ...metric,
    });
    if (navigator.sendBeacon) return navigator.sendBeacon(url, body);
    return fetch(url, { body, method: "POST", keepalive: true });
  });
}
