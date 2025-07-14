"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { generateBreadcrumbs } from "@/lib/generate-breadcrumbs";

export const useBreadcrumbs = (title?: string) => {
  const pathname = usePathname();
  return useMemo(
    () => generateBreadcrumbs(pathname || "", title),
    [pathname, title],
  );
};
