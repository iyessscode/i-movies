import { MovieDetailCreditsView } from "@/modules/movie/ui/views/movie-detail-credits-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieIdCreditsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.movies.getCredits.queryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading....</p>}>
        <MovieDetailCreditsView id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
