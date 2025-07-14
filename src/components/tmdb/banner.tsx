import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { TMDB_IMAGE } from "@/data/constants";
import {
  IconBookmarkOutline,
  IconHalfStar,
  IconHeartOutline,
  IconPlay,
  IconStar,
  IconStarOutline,
  IconThumbsUpOutline,
} from "@/data/icons";
import { TGenre, TPickCrew } from "@/data/zod/tmdb";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, formatDate, formatDuration } from "@/lib/utils";

import { Container } from "@/components/tmdb/container";
import { ModalTrailer } from "@/components/tmdb/modal-trailer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  backdrop: string | null;
  poster: string | null;
  title: string;
  releaseDate: string;
  runtime?: number | null;
  rating: number;
  voteCount: number;
  overview: string | null;
  genres: TGenre[];
  directors: TPickCrew[];
  writers: TPickCrew[];
  trailerKey: string | null;
};

export const Banner = ({
  backdrop,
  poster,
  title,
  releaseDate,
  runtime,
  rating,
  voteCount,
  overview,
  genres,
  directors,
  writers,
  trailerKey,
}: Props) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const renderStars = (ratingValue: number) => {
    const stars = [];
    const scaledRating = ratingValue / 2;
    const fullStars = Math.floor(scaledRating);
    const hasHalfStar = scaledRating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IconStar key={i} />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<IconHalfStar key={i} />);
      } else {
        stars.push(<IconStarOutline key={i} />);
      }
    }
    return stars;
  };

  const backdropUrl = backdrop ? `${TMDB_IMAGE}/w500${backdrop}` : "/logo.svg";
  const posterUrl = poster ? `${TMDB_IMAGE}/w500${poster}` : "/logo.svg";

  return (
    <div className="relative z-0">
      <div className="size-full md:absolute md:top-0 md:right-0 md:left-0">
        <div className="relative aspect-video max-h-screen lg:static">
          <Image
            src={backdropUrl}
            alt={`${title} Backdrop`}
            fill
            priority
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
            className="size-full object-cover object-top"
          />

          <div className="from-background/0 to-background via-background/80 md:via-background absolute inset-0 -bottom-1 bg-gradient-to-b via-90% md:bg-black/40 md:backdrop-blur-sm" />
          {trailerKey && (
            <ModalTrailer
              trailerKey={trailerKey}
              isOpen={isTrailerModalOpen}
              setIsOpenAction={setIsTrailerModalOpen}
            >
              <Button
                variant="ghost"
                className="absolute top-1/2 left-1/2 z-50 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/50 md:hidden"
                aria-label={`Play trailer for ${title}`}
              >
                <IconPlay className="ml-1 size-6 rounded-full transition-transform hover:scale-110" />
              </Button>
            </ModalTrailer>
          )}
        </div>
      </div>

      <div className="relative z-20 grid max-h-screen grid-cols-7 px-2 md:px-12 md:py-20 lg:px-32">
        <div className="relative hidden md:col-span-2 md:block">
          <div className="relative aspect-2/3 overflow-hidden rounded-lg">
            <Image
              src={posterUrl}
              alt={`${title} Poster`}
              fill
              priority
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
              className="size-full object-cover"
            />
            {trailerKey && (
              <ModalTrailer
                trailerKey={trailerKey}
                isOpen={isTrailerModalOpen}
                setIsOpenAction={setIsTrailerModalOpen}
              >
                <div className="group/poster hover:text-primary absolute flex size-full items-center justify-center rounded-lg transition-transform hover:scale-110 hover:backdrop-blur-sm">
                  <div className="border-foreground group-hover/poster:border-primary size-20 rounded-full border-2 p-4">
                    <IconPlay className="z-20 ml-2 size-10" />
                  </div>
                </div>
              </ModalTrailer>
            )}
          </div>
        </div>
        <div className="text-foreground col-span-7 flex flex-col space-y-4 md:col-span-5 md:px-12">
          <h1 className="text-center text-xl leading-tight font-extrabold drop-shadow-lg md:text-start md:text-2xl lg:text-3xl">
            {title}{" "}
            <span className="text-muted-foreground font-bold">
              ({releaseDate && formatDate(releaseDate, "year")})
            </span>
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 text-sm font-medium md:items-start md:justify-start md:gap-4 md:text-lg">
            <div className="flex h-6 items-center justify-center space-x-4 md:items-start md:justify-start md:text-lg">
              <p>{releaseDate && formatDate(releaseDate)}</p>
              <Separator
                orientation="vertical"
                className={cn(!runtime && "hidden")}
              />
              <p>{runtime !== 0 && runtime && formatDuration(runtime)}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start md:gap-4 md:text-lg">
              {genres.map((genre, index) => (
                <div key={genre.id}>
                  <Button asChild variant={isMobile ? "ghost" : "outline"}>
                    <Link
                      prefetch
                      href={`/movies/genres?genreIds=${genre.id}`}
                      className="text-foreground hover:text-primary font-semibold transition-colors"
                    >
                      {genre.name}
                    </Link>
                  </Button>
                  {index < genres.length - 1 && (
                    <span className="md:hidden">&bull;</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 md:place-items-start md:gap-y-4">
            <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
              <div className="flex items-center gap-x-1 text-lg font-semibold text-[#E5DB22] md:text-2xl">
                {renderStars(rating)}
                <span className="text-foreground ml-2 md:text-2xl">
                  {(Math.round(rating * 10) / 10).toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground text-sm md:text-lg">
                ({voteCount} Votes)
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="hover:text-primary"
                aria-label="Add to Watchlist"
                title="Add to Watchlist"
              >
                <IconBookmarkOutline />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:text-primary"
                aria-label="Mark as Favorite"
                title="Mark as Favorite"
              >
                <IconHeartOutline />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:text-primary"
                aria-label="Like"
                title="I Like This"
              >
                <IconThumbsUpOutline />
              </Button>
            </div>
          </div>

          {overview && (
            <div className="px-2 md:px-0">
              <Container label="Overview">
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    isExpanded ? "line-clamp-none" : "line-clamp-3",
                  )}
                  onClick={() => setIsExpanded(true)}
                >
                  {overview}
                </p>
              </Container>
            </div>
          )}

          <div className="hidden items-center space-x-12 md:flex">
            {directors.length > 0 && (
              <div className="flex flex-col space-y-1">
                <h1 className="text-foreground text-xl font-bold">
                  {directors.length > 1 ? "Directors" : "Director"}
                </h1>
                <div className="flex flex-wrap space-x-2">
                  {directors.map((director, index) => (
                    <Link
                      key={`${director.id} - ${index}`}
                      href={`/people/${director.id}`}
                      className="text-muted-foreground hover:text-primary text-base leading-relaxed"
                      onClick={() => setIsExpanded(true)}
                    >
                      {director.name}
                      {directors.length > 1 &&
                        index < directors.length - 1 &&
                        ","}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {writers.length > 0 && (
              <div className="flex flex-col space-y-1">
                <h1 className="text-foreground text-xl font-bold">Writers</h1>
                <div className="flex flex-wrap space-x-2">
                  {writers.map((writer, index) => (
                    <Link
                      key={`${writer.id} - index`}
                      href={`/people/${writer.id}`}
                      className="text-muted-foreground hover:text-primary text-base leading-relaxed"
                      onClick={() => setIsExpanded(true)}
                    >
                      {writer.name}
                      {writers.length > 1 && index < writers.length - 1 && ","}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
