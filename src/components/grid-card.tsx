import { TImageCard, TLinkPrefix } from "@/data/types";

import { CardImage, CardImageSkeleton } from "@/components/card/card-image";

type Props = {
  linkPrefix: TLinkPrefix;
  items: TImageCard[];
  imagePriority?: number;
  useBackground?: boolean;
};

export const GridCard = ({
  linkPrefix,
  items,
  imagePriority = 5,
  useBackground,
}: Props) => {
  if (!items || items.length === 0) {
    return <p>Items not found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
      {items.map((item, index) => {
        return (
          <div key={`${item.id} - ${index}`} className="w-full">
            <CardImage
              key={item.id}
              id={item.id}
              linkPrefix={linkPrefix}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              voteAverage={item.voteAverage}
              priority={index < imagePriority}
              useBackground={useBackground}
            />
          </div>
        );
      })}
    </div>
  );
};

export const GridCardSkeleton = ({ length = 15 }: { length?: number }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
      {Array.from({ length: length }).map((_, index) => (
        <div key={index} className="w-full">
          <CardImageSkeleton />
        </div>
      ))}
    </div>
  );
};
