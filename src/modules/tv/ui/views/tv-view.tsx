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

type Props = {
  category: string;
};

export const TvView = ({ category }: Props) => {
  const trpc = useTRPC();

  const {
    data: tvData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(
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

  const allTvShow = Array.from(
    new Map(
      tvData.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const dataGrid = convertDataImage({ allData: allTvShow });
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col">
      <ButtonScrollTop />
      <Breadcrumbs />
      <GridCard linkPrefix="tv" items={dataGrid} />
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        allTvShow.length > 0 &&
        tvData.pages[0].total_pages > 1 && (
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
