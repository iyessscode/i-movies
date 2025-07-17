"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { CardImage } from "@/components/card/card-image";
import { LoadMore } from "@/components/load-more";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

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
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {allData.map((item, index) => {
          const imageUrl = item.imageUrl.posterUrl ?? null;
          const description = item.detail.releaseDate ?? null;

          return (
            <div key={`${item.id}-${index}`} className="w-full">
              <CardImage
                id={item.id}
                linkPrefix={item.mediaType}
                imageUrl={imageUrl}
                title={item.title}
                description={description}
                voteAverage={item.voteAverage ? item.voteAverage : undefined}
              />
            </div>
          );
        })}
      </div>
      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
