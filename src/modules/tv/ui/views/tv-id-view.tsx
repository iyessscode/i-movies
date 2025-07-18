"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ButtonScrollTop } from "@/components/button-scroll-top";
import { CardCarousel } from "@/components/card/card-carousel";
import { Footer } from "@/components/navigation/footer";
import { Banner } from "@/components/tmdb/banner";
import { Cast } from "@/components/tmdb/cast";
import { Media } from "@/components/tmdb/media";
import { Reviews } from "@/components/tmdb/reviews";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { TvCurrentSession } from "@/modules/tv/ui/components/tv-current-session";

type Props = {
  id: string;
};

export const TvIdView = ({ id }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.tv.getOne.queryOptions({
      id,
    }),
  );

  const trailer = data.videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const trailerKey = trailer ? trailer.key : null;

  return (
    <div className="flex w-full flex-col">
      <ButtonScrollTop />
      <Breadcrumbs title={data.name} className="absolute top-0 left-4 z-50" />
      <Banner
        backdrop={data.backdrop_path}
        poster={data.poster_path}
        title={data.name}
        releaseDate={data.first_air_date}
        overview={data.overview}
        rating={data.vote_average}
        voteCount={data.vote_count}
        genres={data.genres}
        directors={data.credits.crew.filter(
          (crewMember) => crewMember.job === "Director",
        )}
        writers={data.credits.crew.filter(
          (crewMember) => crewMember.job === "Writer",
        )}
        trailerKey={trailerKey}
      />
      <div className="z-50 container flex max-w-[1200px] flex-col items-center justify-center gap-y-5 px-4 md:mx-auto">
        <ButtonScrollTop />
        <Cast id={data.id} linkPrefix="movie" cast={data.credits.cast} />
        <TvCurrentSession
          id={data.id}
          name={data.name}
          lastSeason={data.seasons.at(-1)}
          lastEpisode={data.last_episode_to_air}
        />
        <Media
          linkPrefix="movie"
          id={data.id}
          videos={data.videos.results}
          backdrops={data.images.backdrops}
          posters={data.images.posters}
        />
        <Reviews id={data.id} reviews={data.reviews.results} />
        <CardCarousel
          label={`Suggestion like "${data.name}"`}
          items={data.similar.results}
          imageType="backdrop"
          className="basis-4/5 md:basis-1/3 lg:basis-1/4"
        />
        <CardCarousel
          label="Mybe you also like"
          items={data.recommendations.results}
          imageType="backdrop"
          linkShowMore={`/${data.id}/recommendations`}
          labelShowMore="See More"
          className="basis-4/5 md:basis-1/3 lg:basis-1/4"
        />
      </div>
      <Footer />
    </div>
  );
};
