import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { IconLoader } from "@/data/icons";

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
      <Suspense
        fallback={
          <div className="absolute flex w-full items-center justify-center">
            <IconLoader className="text-primary size-9 animate-spin" />
          </div>
        }
      >
        <MovieIdView id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
