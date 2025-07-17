"use client";

import Image from "next/image";
import Link from "next/link";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { TMDB_IMAGE } from "@/data/constants";
import { IconChevronRight, IconStar } from "@/data/icons";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  query: string;
};

export const SearchResults = ({ query, handleSubmit }: Props) => {
  const trpc = useTRPC();

  const { data: searchData } = useSuspenseQuery(
    trpc.search.searchQuery.queryOptions({
      query,
    }),
  );

  if (searchData.results.length === 0) {
    return (
      <div className="bg-background border-primary/50 z-50 rounded-md border p-4">
        <Card className="border-background bg-primary/5 z-50 flex h-24 items-center justify-center">
          <h1 className="text-muted-foreground text-center font-bold">
            No results found for{" "}
            <span className="text-foreground">&quot;{query}&quot;</span>
          </h1>
        </Card>
      </div>
    );
  }

  const sortedData = [...searchData.results].sort(
    (a, b) => b.popularity! - a.popularity!,
  );

  return (
    <div className="px-4">
      <ScrollArea className="bg-background border-primary/50 z-50 max-h-[60vh] overflow-y-auto rounded-md border p-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center justify-center space-y-2">
          {sortedData.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${item.mediaType === "person" ? "people" : item.mediaType}/detail/${item.id}`}
                className="group w-full"
              >
                {item.mediaType === "person" ? (
                  <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                    <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={
                          `${TMDB_IMAGE}/w500${item.imageUrl.profileUrl}` ||
                          "/logo.svg"
                        }
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
                            <span className="text-muted-foreground">{` ${item.detail.gender}`}</span>
                          </p>
                        </li>
                        <li className="flex flex-row flex-wrap">
                          <p className="text-muted-foreground/50">
                            {"Department: "}
                            <span className="text-muted-foreground">{` ${item.detail.department}`}</span>
                          </p>
                        </li>
                        <li className="flex flex-wrap">
                          <p className="text-muted-foreground/50 line-clamp-1">
                            {"Known For: "}
                            <span className="text-muted-foreground">{` ${item.detail.knownFor}`}</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Card>
                ) : (
                  <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                    <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={
                          `${TMDB_IMAGE}/w500${item.imageUrl.posterUrl}` ||
                          "/logo.svg"
                        }
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
                        <span>{item.detail.releaseDate}</span>
                        <Separator className="h-full" orientation="vertical" />
                        <span className="flex items-center gap-x-2 text-[#E5DB22]">
                          <IconStar />
                          {` ${item.voteAverage}`}
                        </span>
                      </div>
                      <p className="text-muted-foreground/50 line-clamp-3 text-sm">
                        {item.detail.overview
                          ? item.detail.overview
                          : "No overview"}
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
              onClick={handleSubmit}
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
