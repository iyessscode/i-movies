import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  PeopleIdView,
  PeopleIdViewSkeleton,
} from "@/modules/people/ui/views/people-id-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PeopleDetailIdPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.people.getOne.queryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PeopleIdViewSkeleton />}>
        <PeopleIdView id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
