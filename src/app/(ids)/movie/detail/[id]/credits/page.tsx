import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { IconLoader } from "@/data/icons";

import { MovieDetailCreditsView } from "@/modules/movie/ui/views/movie-detail-credits-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieIdCreditsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.movies.getCredits.queryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <IconLoader className="text-primary size-9 animate-spin" />
          </div>
        }
      >
        <MovieDetailCreditsView id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
