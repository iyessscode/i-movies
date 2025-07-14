import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { MovieIdView } from "@/modules/movie/ui/views/movie-id-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailIdPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.movies.getOne.queryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <MovieIdView id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
