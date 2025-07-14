import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GridCardSkeleton } from "@/components/grid-card";

import { PeopleView } from "@/modules/people/ui/views/people-view";

export default async function PeoplePage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.people.getMany.infiniteQueryOptions({}),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GridCardSkeleton />}>
        <PeopleView />
      </Suspense>
    </HydrationBoundary>
  );
}
