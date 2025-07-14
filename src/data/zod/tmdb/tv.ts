import { z } from "zod";

import {
  BaseGenreSchema,
  BaseMediaSchema,
  BaseProductionCompanySchema,
  BaseProductionCountrySchema,
  BaseSpokenLanguageSchema,
  PickCast,
  PickCrew,
  PickImage,
  PickReview,
  PickVideo,
} from "@/data/zod/tmdb/base";

const TvListSchema = BaseMediaSchema.extend({
  name: z.string().default(""),
  original_name: z.string(),
  first_air_date: z.string().default(""),
  origin_country: z.array(z.string()),
});

export const PickTvList = TvListSchema.pick({
  id: true,
  name: true,
  poster_path: true,
  backdrop_path: true,
  first_air_date: true,
  vote_average: true,
});

const TvListWithMediaTypeSchema = TvListSchema.extend({
  media_type: z.literal("tv"),
});

export const PickTvListWithMediaType = TvListWithMediaTypeSchema.pick({
  id: true,
  name: true,
  backdrop_path: true,
  poster_path: true,
  first_air_date: true,
  overview: true,
  vote_average: true,
  popularity: true,
  media_type: true,
});

const TvCreatedBySchema = z.object({
  id: z.number().default(0),
  credit_id: z.string(),
  name: z.string(),
  gender: z.number().min(0).max(3).default(0),
  profile_path: z.string().nullable(),
});

export const TvEpisodeSchema = z.object({
  id: z.number().default(0),
  name: z.string(),
  overview: z.string(),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
  air_date: z.string(),
  episode_number: z.number().default(0),
  production_code: z.string(),
  runtime: z.number().nullable(),
  season_number: z.number().default(0),
  show_id: z.number().default(0),
  still_path: z.string().nullable(),
});

export const TvSeasonSchema = z.object({
  air_date: z.string().nullable(),
  episode_count: z.number().optional(),
  id: z.number().default(0),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  season_number: z.number().default(0),
  vote_average: z.number().default(0),
});

const TvDetailSchema = TvListSchema.extend({
  created_by: z.array(TvCreatedBySchema),
  episode_run_time: z.array(z.number()),
  genres: z.array(BaseGenreSchema),
  homepage: z.string().nullable(),
  in_production: z.boolean(),
  languages: z.array(z.string()),
  last_air_date: z.string().nullable(),
  last_episode_to_air: TvEpisodeSchema.nullable(),
  next_episode_to_air: TvEpisodeSchema.nullable(),
  networks: z.array(BaseProductionCompanySchema),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  production_companies: z.array(BaseProductionCompanySchema),
  production_countries: z.array(BaseProductionCountrySchema),
  seasons: z.array(TvSeasonSchema),
  spoken_languages: z.array(BaseSpokenLanguageSchema),
  status: z.string(),
  tagline: z.string().nullable(),
  type: z.string(),
});

const TvFullDetailSchema = TvDetailSchema.extend({
  credits: z.object({
    cast: z.array(PickCast),
    crew: z.array(PickCrew),
  }),
  videos: z.object({
    results: z.array(PickVideo),
  }),
  images: z.object({
    backdrops: z.array(PickImage),
    logos: z.array(PickImage),
    posters: z.array(PickImage),
  }),
  reviews: z.object({
    page: z.number(),
    results: z.array(PickReview),
    total_pages: z.number(),
    total_results: z.number(),
  }),
  recommendations: z.object({
    page: z.number(),
    results: z.array(PickTvList),
    total_pages: z.number(),
    total_results: z.number(),
  }),
  similar: z.object({
    page: z.number(),
    results: z.array(PickTvList),
    total_pages: z.number(),
    total_results: z.number(),
  }),
});

export const PickTvFullDetail = TvFullDetailSchema.pick({
  id: true,
  name: true,
  status: true,
  original_language: true,
  backdrop_path: true,
  poster_path: true,
  genres: true,
  vote_average: true,
  vote_count: true,
  first_air_date: true,
  overview: true,
  tagline: true,
  episode_run_time: true,
  credits: true,
  videos: true,
  images: true,
  reviews: true,
  similar: true,
  recommendations: true,
  production_companies: true,
  production_countries: true,
  spoken_languages: true,
  created_by: true,
  number_of_seasons: true,
  number_of_episodes: true,
  seasons: true,
  last_air_date: true,
  last_episode_to_air: true,
  next_episode_to_air: true,
});
