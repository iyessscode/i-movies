"use client";

import { TImageCard, TLinkPrefix } from "@/data/types";
import { useCarousel } from "@/hooks/use-carousel";
import { formatDate } from "@/lib/utils";

import { CardImage, CardImageSkeleton } from "@/components/card/card-image";
import { CarouselWrapper } from "@/components/tmdb/carousel-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  label: string;
  linkPrefix: TLinkPrefix;
  linkShowMore?: string;
  labelShowMore?: string;
  items: TImageCard[];
  isPoster?: boolean;
  className?: string;
};

export const CardCarousel = ({
  label,
  linkPrefix,
  linkShowMore,
  labelShowMore,
  items,
  isPoster = true,
  className = "basis-1/2 md:basis-1/4",
}: Props) => {
  if (items.length === 0) return null;
  return (
    <CarouselWrapper
      label={label}
      labelShowMore={labelShowMore}
      linkShowMore={linkShowMore}
    >
      {items.map((item, index) => (
        <CarouselItem key={`${item.id}-${index}`} className={className}>
          <CardImage
            linkPrefix={item.mediaType ?? linkPrefix}
            id={item.id}
            imageUrl={item.imageUrl}
            description={item.description && formatDate(item.description)}
            title={item.title}
            isPoster={isPoster}
            voteAverage={item.voteAverage}
          />
        </CarouselItem>
      ))}
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
