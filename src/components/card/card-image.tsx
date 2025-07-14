import Image from "next/image";
import Link from "next/link";

import { TMDB_IMAGE } from "@/data/constants";
import { IconStar } from "@/data/icons";
import { TLinkPrefix } from "@/data/types";
import { cn } from "@/lib/utils";

import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type CardImageProps = {
  id: number;
  linkPrefix: TLinkPrefix;
  imageUrl: string | null;
  title: string;
  description?: string | null;
  voteAverage?: number | null;
  isPoster?: boolean;
  useBackground?: boolean;
  priority?: boolean;
};

export const CardImage = ({
  id,
  linkPrefix,
  imageUrl,
  title,
  description,
  voteAverage = null,
  isPoster = true,
  useBackground = false,
  priority = false,
}: CardImageProps) => {
  let url = "";

  if (linkPrefix === "person") {
    url = `/people/detail/${id}`;
  } else {
    url = `/${linkPrefix}/detail/${id}`;
  }
  return (
    <Card
      className={cn(
        "gap-0 border-0 bg-transparent p-0",
        useBackground && "size-full border-1 bg-transparent",
      )}
    >
      <Link href={url} className="group" prefetch>
        <div
          className={cn(
            "relative overflow-hidden rounded-lg",
            isPoster ? "aspect-2/3" : "aspect-video",
          )}
        >
          {voteAverage !== 0 && (
            <div className="absolute top-0 left-0 flex h-7 w-16 items-center justify-center">
              <div className="bg-primary border-background absolute z-20 size-full rounded-br-lg transition-colors duration-150 ease-in" />
              <div className="z-20 flex items-center justify-center gap-x-2 text-white">
                <IconStar />
                <span>{voteAverage && voteAverage.toFixed(1)}</span>
              </div>
            </div>
          )}
          <Image
            src={imageUrl ? `${TMDB_IMAGE}/w500/${imageUrl}` : "/logo.svg"}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
            className="transition-transform duration-200 ease-in hover:scale-105"
          />
        </div>
      </Link>

      <CardFooter
        className={cn(
          "flex flex-col items-start space-y-1 p-2",
          !useBackground && "px-0",
        )}
      >
        <Link
          href={url}
          className="text-foreground hover:text-primary text-base font-semibold transition-colors duration-150 ease-out"
          aria-label={title}
          title={title}
          prefetch
        >
          {title}
        </Link>
        {description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export const CardImageSkeleton = ({
  isPoster = true,
}: {
  isPoster?: boolean;
}) => {
  return (
    <Card className="border-primary/10 gap-0 overflow-hidden border-0 p-0">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          isPoster ? "aspect-2/3" : "aspect-video",
        )}
      >
        <Skeleton className="size-full" />
      </div>
      <CardFooter className="flex flex-col items-start space-y-1 px-0 py-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardFooter>
    </Card>
  );
};
