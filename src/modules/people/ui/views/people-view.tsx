"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { IconLoader } from "@/data/icons";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { convertDataImage } from "@/lib/utils";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { GridCard } from "@/components/grid-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Footer } from "@/components/navigation/footer";

export const PeopleView = () => {
  const trpc = useTRPC();

  const {
    data: people,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(
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

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const allPeople = Array.from(
    new Map(
      people.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );

  const dataGrid = convertDataImage({ allData: allPeople });

  return (
    <div className="flex flex-col">
      <Breadcrumbs />
      <GridCard linkPrefix="person" items={dataGrid} useBackground={true} />
      <ButtonScrollTop />
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        allPeople.length > 0 &&
        people.pages[0].total_pages > 1 && (
          <>
            <p className="text-muted-foreground py-4 text-center">
              You&apos;ve reached the end!
            </p>
            <Footer />
          </>
        )
      )}
    </div>
  );
};
