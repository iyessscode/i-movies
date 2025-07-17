import { TBaseResults } from "@/data/zod/tmdb";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { CardImage, CardImageSkeleton } from "@/components/card/card-image";
import { LoadMore } from "@/components/load-more";
import {
  Breadcrumbs,
  BreadcrumbsSkeleton,
} from "@/components/navigation/breadcrumbs";

type Props = {
  items: TBaseResults[];
  imageType?: "poster" | "backdrop" | "profile";
  descriptionType?: "releaseDate" | "knownFor";
  useBackground?: boolean;
  priorityLength?: number;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const GridView = ({
  items,
  imageType = "poster",
  descriptionType = "releaseDate",
  useBackground = false,
  priorityLength = 10,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col">
      <ButtonScrollTop />
      <Breadcrumbs />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
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
            <div key={`${item.id}-${index}`} className="w-full">
              <CardImage
                id={item.id}
                linkPrefix={item.mediaType}
                imageUrl={imageUrl}
                title={item.title}
                description={description}
                voteAverage={item.voteAverage ? item.voteAverage : undefined}
                priority={index < priorityLength}
                useBackground={useBackground}
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

export const GridViewSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col">
      <BreadcrumbsSkeleton />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full">
            <CardImageSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};
