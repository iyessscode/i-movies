import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GridCardSkeleton } from "@/components/grid-card";

import { TrendingView } from "@/modules/trending/ui/views/trending-view";

export default async function MoviePage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.trending.getMany.infiniteQueryOptions({
      category: "movie",
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GridCardSkeleton />}>
        <TrendingView category="movie" />
      </Suspense>
    </HydrationBoundary>
  );
}
