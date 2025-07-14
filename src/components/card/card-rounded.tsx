import Image from "next/image";
import Link from "next/link";

import { TMDB_IMAGE } from "@/data/constants";
import { cn } from "@/lib/utils";

type CardRoundedProps = {
  id: number;
  imageUrl: string | null;
  title: string;
  description: string | null;
  reverse?: boolean;
};

export const CardRounded = ({
  id,
  imageUrl,
  title,
  description,
  reverse = false,
}: CardRoundedProps) => {
  return (
    <div className="flex w-24 flex-col items-center justify-center gap-y-2 lg:w-32">
      <Link href={`/people/detail/${id}`}>
        <div className="border-primary relative aspect-square size-24 overflow-hidden rounded-full border lg:size-32">
          <Image
            src={imageUrl ? `${TMDB_IMAGE}/w500${imageUrl}` : "/logo.svg"}
            alt={title || "Image"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
            className="bg-primary/10 object-cover transition-transform duration-200 ease-in hover:scale-105"
          />
        </div>
      </Link>
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-1",
          reverse && "flex-col-reverse",
        )}
      >
        <Link
          href={`/people/${id}`}
          className="hover:text-primary line-clamp-1 font-semibold"
        >
          {title}
        </Link>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};
