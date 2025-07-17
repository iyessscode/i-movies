import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GridViewSkeleton } from "@/modules/grid-view";
import { TvView } from "@/modules/tv/ui/views/tv-view";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function TvCategoryPage({ params }: Props) {
  const { category } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.tv.getMany.infiniteQueryOptions({
      category,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GridViewSkeleton />}>
        <TvView category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}
