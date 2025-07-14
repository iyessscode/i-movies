import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GridViewSkeleton } from "@/modules/grid-view-skeleton";
import { MovieView } from "@/modules/movie/ui/views/movie-view";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function MovieCategoryPage({ params }: Props) {
  const { category } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.movies.getMany.infiniteQueryOptions({
      category,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GridViewSkeleton />}>
        <MovieView category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}
