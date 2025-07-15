import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { SearchView } from "@/modules/search/ui/views/search-view";

type Props = {
  searchParams: Promise<{
    category: "multi" | "movie" | "person" | "tv";
    search: string;
  }>;
};

export default async function AdvanceSearchPage({ searchParams }: Props) {
  const queryClient = getQueryClient();
  const { category, search } = await searchParams;

  queryClient.prefetchInfiniteQuery(
    trpc.search.searchQuery.infiniteQueryOptions({
      category,
      query: search,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchView category={category} search={search} />
      </Suspense>
    </HydrationBoundary>
  );
}
