import Image from "next/image";
import Link from "next/link";

import { TMDB_IMAGE } from "@/data/constants";
import { IconStar } from "@/data/icons";
import { TTvEpisode, TTvSeason } from "@/data/zod/tmdb";
import { formatDate } from "@/lib/utils";

import { Card } from "@/components/ui/card";

type Props = {
  id: number;
  name: string;
  lastSeason?: TTvSeason;
  lastEpisode: TTvEpisode | null;
};

export const TvCurrentSession = ({
  id,
  name,
  lastSeason,
  lastEpisode,
}: Props) => {
  if (!lastSeason) return;
  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground border-l-primary border-l-4 px-4 text-xl font-bold">
          Current Session
        </h1>
      </div>
      <div className="w-full">
        <Card className="flex flex-row overflow-hidden p-0">
          <div className="relative hidden aspect-2/3 w-36 md:flex">
            <Image
              src={
                lastSeason.poster_path
                  ? `${TMDB_IMAGE}/w500${lastSeason.poster_path}`
                  : "/logo.svg"
              }
              alt={lastSeason.name}
              fill
              sizes="16vw"
              className="bg-primary/10 object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between space-y-2 p-4 md:py-8">
            <div className="flex flex-col space-y-2">
              <Link
                href={`/tv/${id}/season/${lastSeason.id}`}
                className="hover:text-primary text-xl font-bold"
              >
                {lastSeason.name}
              </Link>
              <div className="flex flex-row space-x-4">
                <p className="bg-primary flex items-center justify-center gap-x-2 rounded-lg px-2">
                  {lastSeason.vote_average}
                  <IconStar />
                </p>
                <span className="text-muted-foreground">
                  {lastSeason.episode_count && lastSeason.episode_count > 1
                    ? `${lastSeason.episode_count} Episodes`
                    : `${lastSeason.episode_count} Episode`}
                </span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">
                {lastSeason.overview
                  ? lastSeason.overview
                  : lastSeason.air_date &&
                    `Season ${lastSeason.season_number} of ${name} premiered on ${formatDate(lastSeason.air_date)}`}
              </p>
            </div>
            <div className="flex flex-row space-x-4">
              <Link
                href={`/tv/${id}/season/${lastSeason.id}/episode/${lastEpisode?.id}`}
                className="text-primary underline underline-offset-4"
              >
                {lastEpisode?.name}
              </Link>
              <p>{`(${lastSeason.season_number}x${lastEpisode?.episode_number}, ${lastEpisode?.air_date && formatDate(lastEpisode.air_date)})`}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
