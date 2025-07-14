import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GridViewSkeleton } from "@/modules/grid-view-skeleton";
import { TrendingView } from "@/modules/trending/ui/views/trending-view";

export default async function TvPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.trending.getMany.infiniteQueryOptions({
      category: "tv",
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GridViewSkeleton />}>
        <TrendingView category="tv" />
      </Suspense>
    </HydrationBoundary>
  );
}
