import { GridCardSkeleton } from "@/components/grid-card";
import { BreadcrumbsSkeleton } from "@/components/navigation/breadcrumbs";

export const GridViewSkeleton = () => {
  return (
    <div className="flex flex-col">
      <BreadcrumbsSkeleton />
      <GridCardSkeleton />
    </div>
  );
};
