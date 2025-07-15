import { GridCardSkeleton } from "@/components/grid-card";
import { BreadcrumbsSkeleton } from "@/components/navigation/breadcrumbs";

export const GridViewSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col">
      <BreadcrumbsSkeleton />
      <GridCardSkeleton />
    </div>
  );
};
