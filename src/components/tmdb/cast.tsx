"use client";

import Link from "next/link";

import { TPickCast } from "@/data/zod/tmdb";

import { CardRounded } from "@/components/card/card-rounded";
import { CarouselWrapper } from "@/components/tmdb/carousel-wrapper";
import { CarouselItem } from "@/components/ui/carousel";

type Props = {
  id: number;
  linkPrefix: "movie" | "tv";
  cast: TPickCast[];
};

export const Cast = ({ id, linkPrefix, cast }: Props) => {
  const displayLimit = 15;
  const shouldShowMoreCard = cast.length > displayLimit;

  const castToDisplay = shouldShowMoreCard
    ? cast.slice(0, displayLimit - 1)
    : cast;
  return (
    <CarouselWrapper
      label="Top Billed Cast"
      linkShowMore={`/${linkPrefix}/detail/${id}/credits`}
      labelShowMore="Full Cast & Crew"
    >
      {castToDisplay.map((people, index) => (
        <CarouselItem key={`${people.id} - ${index}`} className="basis-auto">
          <CardRounded
            id={people.id}
            imageUrl={people.profile_path}
            title={people.name}
            description={people.character}
            reverse
          />
        </CarouselItem>
      ))}

      {shouldShowMoreCard && (
        <CarouselItem className="basis-1/3 md:basis-auto">
          <Link
            href={`/movie/${id}/credits`}
            className="text-primary hover:text-primary/80"
          >
            <div className="border-primary relative flex size-24 items-center justify-center rounded-full border lg:size-32">
              Show More
            </div>
          </Link>
        </CarouselItem>
      )}
    </CarouselWrapper>
  );
};
