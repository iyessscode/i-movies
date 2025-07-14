"use client";

import { useTRPC } from "@/trpc/client";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/tmdb/container";
import { Card } from "@/components/ui/card";
import { TMDB_IMAGE } from "@/data/constants";
import { convertGender } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
};

export const MovieDetailCreditsView = ({ id }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.movies.getCredits.queryOptions({ id }),
  );

  const crewByDepartment = data.crew.reduce(
    (acc, crew) => {
      if (!acc[crew.department]) {
        acc[crew.department] = [];
      }
      acc[crew.department].push(crew);
      return acc;
    },
    {} as Record<string, typeof data.crew>,
  );

  const sortedDepartments = Object.keys(crewByDepartment).sort();

  return (
    <div className="flex w-full flex-col">
      <ButtonScrollTop />
      <Breadcrumbs title={data.title} className="absolute top-0 left-4 z-50" />
      <div className="p-4 pt-20 lg:px-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* CAST */}
          <Container label="Cast">
            <div className="flex flex-col items-center justify-center space-y-2">
              {data.cast.map((item, index) => (
                <Link
                  key={`${item.id} - ${index}`}
                  href={`/people/detail/${item.id}`}
                  className="group w-full"
                >
                  <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                    <div className="relative aspect-2/3 w-14 overflow-hidden rounded-lg">
                      <Image
                        src={
                          item.profile_path
                            ? `${TMDB_IMAGE}/w92${item.profile_path}`
                            : "/logo.svg"
                        }
                        alt={item.name}
                        fill
                        sizes="16.66vw"
                        className="bg-primary/10 object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col space-y-1">
                      <h1 className="line-clamp-1 text-lg font-semibold">
                        {item.name}
                      </h1>
                      <ul className="flex flex-col text-sm">
                        <li className="flex flex-wrap">
                          <p className="text-muted-foreground/50">
                            {"Gender: "}
                            <span className="text-muted-foreground">
                              {` ${convertGender(item.gender)}`}
                            </span>
                          </p>
                        </li>
                        <li className="flex flex-wrap">
                          <p className="text-muted-foreground/50">
                            {"Character: "}
                            <span className="text-muted-foreground">
                              {` ${item.character}`}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
          <div className="flex flex-col space-y-4">
            {sortedDepartments.map((department) => (
              <div key={department} className="space-y-2">
                <Container label={department}>
                  {crewByDepartment[department].map((item, index) => (
                    <Link
                      key={`${item.id}-${index}`}
                      href={`/people/detail/${item.id}`}
                      className="group w-full"
                    >
                      <Card className="border-primary/10 bg-primary/5 group-hover:border-primary flex w-full flex-row gap-4 p-2">
                        <div className="relative aspect-2/3 w-14 overflow-hidden rounded-lg">
                          <Image
                            src={
                              item.profile_path
                                ? `${TMDB_IMAGE}/w92${item.profile_path}`
                                : "/logo.svg"
                            }
                            alt={item.name}
                            fill
                            sizes="16.66vw"
                            className="bg-primary/10 object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col space-y-1">
                          <h1 className="line-clamp-1 text-lg font-semibold">
                            {item.name}
                          </h1>
                          <ul className="flex flex-col text-sm">
                            <li className="flex flex-wrap">
                              <p className="text-muted-foreground/50">
                                {"Gender: "}
                                <span className="text-muted-foreground">
                                  {` ${convertGender(item.gender)}`}
                                </span>
                              </p>
                            </li>
                            <li className="flex flex-wrap">
                              <p className="text-muted-foreground/50">
                                {"Job: "}
                                <span className="text-muted-foreground">
                                  {` ${item.job}`}
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </Container>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
