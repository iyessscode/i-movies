"use client";

import Image from "next/image";
import Link from "next/link";

import { TMDB_IMAGE } from "@/data/constants";
import { TLinkPrefix } from "@/data/types";
import { TPickImage, TPickVideo } from "@/data/zod/tmdb";

import { Container } from "@/components/tmdb/container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  id: number;
  linkPrefix: TLinkPrefix;
  videos: TPickVideo[];
  backdrops: TPickImage[];
  posters: TPickImage[];
};

export const Media = ({
  id,
  linkPrefix,
  videos,
  backdrops,
  posters,
}: Props) => {
  const allPhotos = [...backdrops, ...posters];
  const totalPhotosCount = allPhotos.length;
  const totalVideosCount = videos.length;

  const gridDisplayLimitPhotos = 5;
  const photosToDisplay = allPhotos.slice(0, gridDisplayLimitPhotos);
  const remainingPhotosCount = totalPhotosCount - photosToDisplay.length;

  return (
    <>
      {totalVideosCount > 0 && (
        <Container
          label={totalVideosCount === 1 ? "Video" : "Videos"}
          linkShowMore={totalVideosCount > 5 ? `/movie/${id}/media` : ""}
          labelShowMore="View All Videos"
        >
          <ScrollArea>
            <div className="flex w-max gap-4">
              {videos.slice(0, 8).map((video, index) => (
                <div
                  key={`${video.id} - ${index}`}
                  className="mx:w-[480px] w-[320px] shrink-0"
                >
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-primary/10 overflow-hidden rounded-lg shadow-xl"
                  >
                    {video.site === "YouTube" && (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}?autoplay=0&controls=1`}
                        title={video.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="size-full"
                      ></iframe>
                    )}
                  </AspectRatio>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {video.name}
                  </p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Container>
      )}

      {totalPhotosCount > 0 && (
        <Container
          label={totalPhotosCount === 1 ? "Photo" : "Photos"}
          linkShowMore={totalPhotosCount > 5 ? `/movie/${id}/media` : ""}
          labelShowMore="View All Photos"
        >
          <div className="columns-2 space-y-4 space-x-4 md:columns-3 [&>img:not(:first-child)]:mt-8">
            {photosToDisplay.map((photo, index) => (
              <AspectRatio
                key={`photo-${index}`}
                ratio={photo.aspect_ratio || 2 / 3}
              >
                <Image
                  src={`${TMDB_IMAGE}/w500${photo.file_path}`}
                  alt={`photo ${index + 1}`}
                  height={photo.height || 0}
                  width={photo.width || 0}
                  priority={index < 5}
                  className="h-auto max-w-full rounded-lg"
                />
              </AspectRatio>
            ))}

            {remainingPhotosCount > 0 && (
              <Link
                href={`/${linkPrefix}/${id}/media`}
                className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 text-white transition-colors hover:bg-gray-700"
              >
                <AspectRatio
                  ratio={16 / 9}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-4xl font-bold">
                    +{remainingPhotosCount}
                  </span>
                </AspectRatio>
              </Link>
            )}
          </div>
        </Container>
      )}
    </>
  );
};
