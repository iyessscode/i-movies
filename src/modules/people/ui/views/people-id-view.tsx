"use client";

import Image from "next/image";
import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { TMDB_IMAGE } from "@/data/constants";
import { cn, convertDataImage } from "@/lib/utils";

import {
  CardCarousel,
  CardCarouselSkeleton,
} from "@/components/card/card-carousel";
import { SocialIcon } from "@/components/social-icon";
import { Container } from "@/components/tmdb/container";
import { Skeleton } from "@/components/ui/skeleton";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PeopleKnownFor } from "@/modules/people/ui/components/people-known-for";
import {
  PersonalInfo,
  PersonalInfoSkeleton,
} from "@/modules/people/ui/components/personal-info";

type Props = {
  id: string;
};

export const PeopleIdView = ({ id }: Props) => {
  const trpc = useTRPC();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data } = useSuspenseQuery(trpc.people.getOne.queryOptions({ id }));

  const socialLinks = [
    {
      key: "facebook_id",
      platform: "Facebook",
      url: (id: string) => `https://facebook.com/${id}`,
    },
    {
      key: "instagram_id",
      platform: "Instagram",
      url: (id: string) => `https://instagram.com/${id}`,
    },
    {
      key: "twitter_id",
      platform: "Twitter",
      url: (id: string) => `https://twitter.com/${id}`,
    },
    {
      key: "tiktok_id",
      platform: "Tiktok",
      url: (id: string) => `https://tiktok.com/@${id}`,
    },
    {
      key: "youtube_id",
      platform: "Youtube",
      url: (id: string) => `https://youtube.com/${id}`,
    },
    {
      key: "imdb_id",
      platform: "Imdb",
      url: (id: string) => `https://imdb.com/name/${id}`,
    },
  ].filter(({ key }) => data.social?.[key as keyof typeof data.social]);

  const dataKnownForCarousel = convertDataImage({ allData: data.known_for });

  return (
    <div className="flex w-full flex-col">
      <Breadcrumbs title={data.name} className="absolute top-2 left-4 z-50" />
      <div className="p-4 pt-12 lg:px-24">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-8">
          <div className="col-span-2 mx-auto w-full">
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="bg-primary/10 relative aspect-square size-32 max-h-96 overflow-hidden rounded-lg md:aspect-2/3 md:size-full">
                <Image
                  src={
                    data.profile_path
                      ? `${TMDB_IMAGE}/w500/${data.profile_path}`
                      : "/logo.svg"
                  }
                  alt={data.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
                  className="object-cover"
                />
              </div>
              <h1 className="text-2xl font-extrabold md:hidden">{data.name}</h1>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:mt-6">
              {socialLinks.map(({ key, platform, url }) => (
                <SocialIcon
                  key={key}
                  platform={platform}
                  url={url(
                    data.social[key as keyof typeof data.social] as string,
                  )}
                  className="size-6 md:size-8"
                />
              ))}
            </div>
            <PersonalInfo
              knownFor={data.known_for_department}
              gender={data.gender}
              birthday={data.birthday}
              deathday={data.deathday}
              placeOfBirth={data.place_of_birth}
              alsoKnownAs={data.also_known_as}
            />
          </div>
          <div className="col-span-6">
            <div className="flex flex-col space-y-4">
              <h1 className="hidden text-center text-2xl font-bold md:mb-12 md:flex lg:text-start lg:text-4xl">
                {data.name}
              </h1>
              <Container label="Biography">
                <p
                  className={cn(
                    "text-muted-foreground lg:text-md shrink-0 text-sm",
                    isExpanded
                      ? "line-clamp-none"
                      : "line-clamp-6 cursor-pointer",
                  )}
                  style={{ whiteSpace: "pre-line" }}
                  onClick={() => setIsExpanded(true)}
                >
                  {data.biography
                    ? data.biography
                    : `We don't have a biography for ${data.name}`}
                </p>
              </Container>
              <CardCarousel
                label="Known For"
                items={dataKnownForCarousel}
                linkPrefix={"movie"}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              />
              <PeopleKnownFor items={data.movie_credits.cast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PeopleIdViewSkeleton = () => {
  return (
    <div className="p-4 lg:px-24">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-8">
        <div className="col-span-2 mx-auto w-full">
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <div className="relative aspect-square size-32 max-h-96 overflow-hidden rounded-lg md:aspect-2/3 md:size-full">
              <Skeleton className="size-full" />
            </div>
            <h1 className="text-2xl font-extrabold md:hidden">
              <Skeleton className="h-9 w-36" />
            </h1>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:mt-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="size-9 md:size-12" />
            ))}
          </div>
          <PersonalInfoSkeleton />
        </div>
        <div className="col-span-6">
          <div className="flex flex-col space-y-4">
            <h1 className="hidden text-center text-2xl font-bold md:mb-12 md:flex lg:text-start lg:text-4xl">
              <Skeleton className="h-12 w-42" />
            </h1>
            <div className="flex w-full flex-col gap-y-4">
              <header className="flex items-center justify-between">
                <Skeleton className="h-9 w-32" />
              </header>
              <main className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </main>
            </div>
            <CardCarouselSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
