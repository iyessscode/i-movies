"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { IconLoader } from "@/data/icons";
import { TLinkPrefix } from "@/data/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { convertDataImage } from "@/lib/utils";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { GridCard } from "@/components/grid-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Footer } from "@/components/navigation/footer";

type Props = {
  category: TLinkPrefix;
};

export const TrendingView = ({ category }: Props) => {
  const trpc = useTRPC();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      trpc.trending.getMany.infiniteQueryOptions(
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

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const dataGrid = convertDataImage({ allData: allData });

  return (
    <div className="flex flex-col">
      <Breadcrumbs />
      <GridCard linkPrefix={category} items={dataGrid} />
      <ButtonScrollTop />
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        allData.length > 0 &&
        data.pages[0].total_pages > 1 && (
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
