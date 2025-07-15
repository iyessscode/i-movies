import Image from "next/image";
import Link from "next/link";

import { TMDB_IMAGE } from "@/data/constants";
import { IconStar } from "@/data/icons";
import { TMovieListWithCast } from "@/data/zod/tmdb";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  items: TMovieListWithCast[];
};

export const PeopleKnownFor = ({ items }: Props) => {
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.release_date
      ? new Date(a.release_date).getTime()
      : Infinity;
    const dateB = b.release_date
      ? new Date(b.release_date).getTime()
      : Infinity;
    return dateB - dateA;
  });

  const groupedByYear = sortedItems.reduce(
    (acc, item) => {
      const year = item.release_date
        ? new Date(item.release_date).getFullYear()
        : "Unknown";
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<string | number, TMovieListWithCast[]>,
  );

  return (
    <section className="container flex flex-col space-y-4">
      <main className="relative mt-4 text-sm md:text-base">
        <Card className="overflow-hidden p-0">
          <Table>
            <TableBody>
              {Object.entries(groupedByYear)
                .sort(([yearA], [yearB]) => {
                  if (yearA === "Unknown") return 1;
                  if (yearB === "Unknown") return -1;
                  return Number(yearB) - Number(yearA);
                })
                .map(([year, yearItems]) => (
                  <TableRow key={year} className="hover:bg-transparent">
                    <TableCell colSpan={2} className="p-0">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 p-4">
                          <h4 className="text-muted-foreground min-w-[50px] text-center font-semibold">
                            {year}
                          </h4>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex w-full flex-col gap-2">
                            {yearItems.map((item, index) => (
                              <div
                                key={`${item.id} - ${index}`}
                                className="group flex items-center gap-4"
                              >
                                <div className="text-muted-foreground min-w-[20px]">
                                  <div className="bg-muted-foreground group-hover:bg-primary size-2 rounded-full" />
                                </div>
                                <div className="flex-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link
                                        href={`/movie/detail/${item.id}`}
                                        className="hover:text-primary font-medium"
                                      >
                                        {item.title}
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-card border-primary relative flex max-w-[28rem] flex-row gap-x-2 overflow-hidden border p-6">
                                      <div className="bg-primary absolute top-0 right-0 flex h-6 w-12 items-center justify-center gap-x-1 rounded-bl-lg font-semibold">
                                        <IconStar />
                                        <span>
                                          {item.vote_average.toFixed(1)}
                                        </span>
                                      </div>
                                      <div className="relative aspect-2/3 w-32 overflow-hidden rounded-lg">
                                        <Image
                                          src={
                                            item.poster_path
                                              ? `${TMDB_IMAGE}/w500/${item.poster_path}`
                                              : "/logo.svg"
                                          }
                                          alt={item.title}
                                          fill
                                          priority
                                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
                                          className="bg-primary/10 size-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 space-y-2">
                                        <h1 className="text-lg font-semibold">
                                          {item.title}
                                        </h1>
                                        <span className="text-muted-foreground line-clamp-6 text-xs">
                                          {item.overview}
                                        </span>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                  {item.character && (
                                    <p className="text-muted-foreground text-sm">
                                      as {item.character}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <IconStar className="text-primary h-4 w-4" />
                                  <span>
                                    {item.vote_average?.toFixed(1) || "-"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator className="bg-primary/20" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </section>
  );
};
