"use client";

import { useCarousel } from "@/hooks/use-carousel";

import { CardImage, CardImageSkeleton } from "@/components/card/card-image";
import { CarouselWrapper } from "@/components/tmdb/carousel-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { TBaseResults } from "@/data/zod/tmdb";

type Props = {
  label: string;
  linkShowMore?: string;
  labelShowMore?: string;
  items: TBaseResults[];
  imageType?: "poster" | "backdrop" | "profile";
  descriptionType?: "releaseDate" | "knownFor";
  priorityLength?: number;
  className?: string;
};

export const CardCarousel = ({
  label,
  linkShowMore,
  labelShowMore,
  items,
  imageType = "backdrop",
  descriptionType = "releaseDate",
  priorityLength = 10,
  className = "basis-1/2 md:basis-1/4",
}: Props) => {
  if (items.length === 0) return null;
  return (
    <CarouselWrapper
      label={label}
      labelShowMore={labelShowMore}
      linkShowMore={linkShowMore}
    >
      {items.map((item, index) => {
        const imageUrl =
          (imageType === "poster"
            ? item.imageUrl.posterUrl
            : imageType === "backdrop"
              ? item.imageUrl.backdropUrl
              : item.imageUrl.profileUrl) ?? null;
        const description =
          (descriptionType === "releaseDate"
            ? item.detail.releaseDate
            : descriptionType === "knownFor"
              ? item.detail.knownFor
              : item.detail.overview) ?? null;

        return (
          <CarouselItem key={`${item.id}-${index}`} className={className}>
            <CardImage
              id={item.id}
              isPoster={false}
              imageType={imageType}
              linkPrefix={item.mediaType}
              imageUrl={imageUrl}
              title={item.title}
              description={description}
              voteAverage={item.voteAverage ? item.voteAverage : undefined}
              priority={index < priorityLength}
            />
          </CarouselItem>
        );
      })}
    </CarouselWrapper>
  );
};

export const CardCarouselSkeleton = () => {
  const { setApi } = useCarousel();
  return (
    <div className="flex w-full flex-col gap-y-4">
      <header className="flex items-center justify-between">
        <Skeleton className="h-9 w-32" />
      </header>
      <main className="relative w-full text-sm md:text-base">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <CardImageSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
    </div>
  );
};
