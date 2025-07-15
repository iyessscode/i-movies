"use client";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { GridCard } from "@/components/grid-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Footer } from "@/components/navigation/footer";
import { IconLoader } from "@/data/icons";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { convertDataImage } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

type Props = {
  category: "multi" | "movie" | "person" | "tv";
  search: string;
};

export const SearchView = ({ category, search }: Props) => {
  const trpc = useTRPC();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      trpc.search.searchQuery.infiniteQueryOptions(
        {
          category,
          query: search,
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

  const dataGrid = convertDataImage({ allData });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  return (
    <div className="flex w-full flex-col">
      <ButtonScrollTop />
      <Breadcrumbs />
      <p className="text-muted-foreground pb-4 text-lg">
        Search:{" "}
        <span className="text-foreground text-lx font-bold">
          &quot;{decodeURIComponent(search)}&quot;
        </span>
      </p>
      <GridCard items={dataGrid} />
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        <>
          <p className="text-muted-foreground py-4 text-center">
            No more results
          </p>
          <Footer />
        </>
      )}
    </div>
  );
};
