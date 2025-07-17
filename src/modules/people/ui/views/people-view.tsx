"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { GridView } from "@/modules/grid-view";

export const PeopleView = () => {
  const trpc = useTRPC();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.people.getMany.infiniteQueryOptions(
        {},
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
      imageType="profile"
      descriptionType="knownFor"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      useBackground={true}
    />
  );
};
