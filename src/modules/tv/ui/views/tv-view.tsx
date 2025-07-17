"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { GridView } from "@/modules/grid-view";

type Props = {
  category: string;
};

export const TvView = ({ category }: Props) => {
  const trpc = useTRPC();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      trpc.tv.getMany.infiniteQueryOptions(
        {
          category,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages
              ? lastPage.page + 1
              : undefined;
          },
        },
      ),
    );

  const allData = Array.from(
    new Map(
      data.pages.flatMap((page) => page.results).map((item) => [item.id, item]),
    ).values(),
  );

  return (
    <GridView
      items={allData}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};
