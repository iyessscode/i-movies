"use client";

import { useCarousel } from "@/hooks/use-carousel";
import { cn } from "@/lib/utils";

import { Container } from "@/components/tmdb/container";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

type Props = {
  children: React.ReactNode;
  label: string;
  linkShowMore?: string;
  labelShowMore?: string;
};

export const CarouselWrapper = ({
  children,
  label,
  linkShowMore,
  labelShowMore,
}: Props) => {
  const { setApi, count, current } = useCarousel();

  return (
    <Container
      label={label}
      linkShowMore={linkShowMore}
      labelShowMore={labelShowMore}
    >
      <div
        className={cn(
          "from-background via-background/70 pointer-events-none absolute top-0 bottom-0 -left-1 z-10 w-10 bg-gradient-to-r via-40% to-transparent md:w-24",
          current === 1 && "hidden",
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
      <div
        className={cn(
          "from-background via-background/70 pointer-events-none absolute top-0 -right-1 bottom-0 z-10 w-10 bg-gradient-to-l via-40% to-transparent md:w-24",
          current === count && "hidden",
        )}
      />
    </Container>
  );
};
