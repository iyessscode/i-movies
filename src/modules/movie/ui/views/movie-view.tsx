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

export const MovieView = ({ category }: Props) => {
  const trpc = useTRPC();

  const {
    data: movieData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.movies.getMany.infiniteQueryOptions(
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

  const allMovies = Array.from(
    new Map(
      movieData.pages
        .flatMap((page) => page.results)
        .map((item) => [item.id, item]),
    ).values(),
  );

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const dataGrid = convertDataImage({ allData: allMovies });

  return (
    <div className="flex flex-col">
      <Breadcrumbs />
      <GridCard useBackground linkPrefix="movie" items={dataGrid} />
      <ButtonScrollTop />
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        allMovies.length > 0 &&
        movieData.pages[0].total_pages > 1 && (
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
