"use client";

import { usePathname } from "next/navigation";
import { determineEnvironment } from "@/lib/helpers";
import { useEffect, useState } from "react";
export default function FeatureFlagEnvironment() {
  const [environment, setEnvironment] = useState("");
  const ads = {
    vendor: "",
    type: ["creative-id", "impression-id"],
    id: "",
    selector: "amp-ad",
  };
  const pathname = usePathname();
  useEffect(() => {
    setEnvironment(pathname.split("/").filter(Boolean).pop() || "");
  }, [pathname]);
  return (
    <>
      <h1>{determineEnvironment(environment)} Features</h1>
    </>
  );
}
