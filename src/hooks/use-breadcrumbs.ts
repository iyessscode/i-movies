// hooks/use-breadcrumbs.ts
import { generateBreadcrumbs } from "@/lib/generate-breadcrumbs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useBreadcrumbs = (title?: string) => {
  const pathname = usePathname();
  return useMemo(
    () => generateBreadcrumbs(pathname || "", title),
    [pathname, title],
  );
};
