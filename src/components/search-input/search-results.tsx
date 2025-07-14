"use client";

import Image from "next/image";
import Link from "next/link";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { TMDB_IMAGE } from "@/data/constants";
import { IconChevronRight, IconStar } from "@/data/icons";
import { TSearchData } from "@/data/types";
import { convertGender, formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  searchQuery: string;
  handleSearch: () => void;
  resultsRef: React.RefObject<HTMLDivElement>;
};

export const SearchResults = ({
  resultsRef,
  searchQuery,
  handleSearch,
}: Props) => {
  const trpc = useTRPC();

  const { data: searchData } = useSuspenseQuery(
    trpc.search.searchQuery.queryOptions({
      query: searchQuery,
    }),
  );

  if (searchData.results.length === 0) {
    return (
      <div
        ref={resultsRef}
        className="bg-background border-primary/50 z-50 rounded-md border p-4"
      >
        <Card className="border-background bg-primary/5 z-50 flex h-24 items-center justify-center">
          <h1 className="text-muted-foreground text-center font-bold">
            No results found for{" "}
            <span className="text-foreground">&quot;{searchQuery}&quot;</span>
          </h1>
        </Card>
      </div>
    );
  }

  const sortingData: TSearchData[] = searchData.results
    .filter((item) => ["movie", "tv", "person"].includes(item.media_type))
    .sort((a, b) => b.popularity - a.popularity)
    .map((item) => {
      switch (item.media_type) {
        case "movie":
          return {
            mediaType: item.media_type,
            id: item.id,
            title: item.title,
            imageUrl: item.poster_path
              ? `${TMDB_IMAGE}/w92${item.poster_path}`
              : null,
            descriptionLeft: item.release_date
              ? formatDate(item.release_date)
              : "-",
            descriptionRight: item.vote_average.toFixed(1),
            footer: item.overview,
          };
        case "tv":
          return {
            mediaType: item.media_type,
            id: item.id,
            title: item.name,
            imageUrl: item.poster_path
              ? `${TMDB_IMAGE}/w92${item.poster_path}`
              : null,
            descriptionLeft: item.first_air_date
              ? formatDate(item.first_air_date)
              : "-",
            descriptionRight: item.vote_average.toFixed(1),
            footer: item.overview,
          };
        case "person":
          return {
            mediaType: "person",
            id: item.id,
            title: item.name,
            imageUrl: item.profile_path
              ? `${TMDB_IMAGE}/w92${item.profile_path}`
              : null,
            descriptionLeft: convertGender(item.gender),
            descriptionRight: item.known_for_department
              ? item.known_for_department
              : "Not Specified",
            footer: item.known_for
              ? item.known_for
                  .slice(0, 3)
                  .map((knownItem) =>
                    knownItem.media_type === "movie"
                      ? (knownItem as { title: string }).title
                      : (knownItem as { name: string }).name,
                  )
                  .join(", ")
              : "Not Specified",
          };
      }
    });
  return (
    <div className="px-4">
      <ScrollArea
        ref={resultsRef}
        className="bg-background border-primary/50 z-50 max-h-[60vh] overflow-y-auto rounded-md border p-4 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          {sortingData.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/${item.mediaType === "person" ? "people" : item.mediaType}/detail/${item.id}`}
                className="group w-full"
              >
                {item.mediaType === "person" ? (
                  <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                    <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.imageUrl || "/logo.svg"}
                        alt={item.title}
                        fill
                        sizes="16.66vw"
                        className="bg-primary/10 object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <h1 className="line-clamp-1 text-lg font-semibold">
                        {item.title}
                      </h1>
                      <ul className="flex flex-col text-sm">
                        <li className="flex flex-wrap">
                          <p className="text-muted-foreground/50">
                            {"Gender: "}
                            <span className="text-muted-foreground">{` ${item.descriptionLeft}`}</span>
                          </p>
                        </li>
                        <li className="flex flex-row flex-wrap">
                          <p className="text-muted-foreground/50">
                            {"Department: "}
                            <span className="text-muted-foreground">{` ${item.descriptionRight}`}</span>
                          </p>
                        </li>
                        <li className="flex flex-wrap">
                          <p className="text-muted-foreground/50 line-clamp-1">
                            {"Known For: "}
                            <span className="text-muted-foreground">{` ${item.footer}`}</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Card>
                ) : (
                  <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                    <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.imageUrl || "/logo.svg"}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="bg-primary/10 object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <h1 className="line-clamp-1 text-lg font-semibold">
                        {item.title}
                      </h1>
                      <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                        <span>{item.descriptionLeft}</span>
                        <Separator className="h-full" orientation="vertical" />
                        <span className="flex items-center gap-x-2 text-[#E5DB22]">
                          <IconStar />
                          {` ${item.descriptionRight}`}
                        </span>
                      </div>
                      <p className="text-muted-foreground/50 line-clamp-3 text-sm">
                        {item.footer ? item.footer : "No overview"}
                      </p>
                    </div>
                  </Card>
                )}
              </Link>
            );
          })}
        </div>
        {searchData.total_pages > 1 && (
          <div className="flex justify-end pt-2">
            <Button
              variant="link"
              onClick={handleSearch}
              className="hover:text-primary text-muted-foreground h-5 text-sm"
            >
              <span>Show more</span>
              <IconChevronRight className="mt-[3px] -ml-1 size-4" />
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div className="px-4">
      <ScrollArea className="bg-background border-primary/50 h-[60vh] rounded-md border p-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="border-primary/5 bg-primary/5 flex w-full flex-row gap-4 p-2"
            >
              <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg">
                <Skeleton className="size-full" />
              </div>
              <div className="flex flex-1 flex-col space-y-3">
                <Skeleton className="h-6 w-4/5" />
                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                  <Skeleton className="h-4 w-24" />
                  <Separator className="h-full" orientation="vertical" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
