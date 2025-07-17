import { z } from "zod";

import {
  BaseGenreSchema,
  BaseMediaSchema,
  BaseProductionCompanySchema,
  BaseProductionCountrySchema,
  BaseResultsSchema,
  BaseSpokenLanguageSchema,
  PickCast,
  PickCrew,
  PickImage,
  PickReview,
  PickVideo,
} from "@/data/zod/tmdb/base";

const MovieListSchema = BaseMediaSchema.extend({
  adult: z.boolean().default(true),
  title: z.string().default(""),
  original_title: z.string(),
  release_date: z.string().default(""),
  video: z.boolean(),
});

export const PickMovieList = MovieListSchema.pick({
  id: true,
  title: true,
  poster_path: true,
  backdrop_path: true,
  release_date: true,
  vote_average: true,
});

const MovieListWithMediaTypeSchema = MovieListSchema.extend({
  media_type: z.literal("movie"),
});

export const PickMovieListWithMediaType = MovieListWithMediaTypeSchema.pick({
  id: true,
  title: true,
  backdrop_path: true,
  poster_path: true,
  release_date: true,
  overview: true,
  vote_average: true,
  popularity: true,
  media_type: true,
});

export const MovieDetailSchema = MovieListSchema.extend({
  belongs_to_collection: z
    .object({
      id: z.number().default(0),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  budget: z.number().default(0),
  genres: z.array(BaseGenreSchema),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
  production_companies: z.array(BaseProductionCompanySchema),
  production_countries: z.array(BaseProductionCountrySchema),
  revenue: z.number().default(0),
  runtime: z.number().nullable(),
  spoken_languages: z.array(BaseSpokenLanguageSchema),
  status: z.string(),
  tagline: z.string().nullable(),
});

export const MovieFullDetailSchema = MovieDetailSchema.extend({
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
    results: z.array(BaseResultsSchema),
    total_pages: z.number(),
    total_results: z.number(),
  }),
  similar: z.object({
    page: z.number(),
    results: z.array(BaseResultsSchema),
    total_pages: z.number(),
    total_results: z.number(),
  }),
});

export const PickMovieFullDetail = MovieFullDetailSchema.pick({
  id: true,
  title: true,
  status: true,
  original_language: true,
  budget: true,
  revenue: true,
  backdrop_path: true,
  poster_path: true,
  genres: true,
  vote_average: true,
  vote_count: true,
  release_date: true,
  overview: true,
  tagline: true,
  runtime: true,
  credits: true,
  videos: true,
  images: true,
  reviews: true,

  similar: true,
  recommendations: true,

  production_companies: true,
  production_countries: true,
  spoken_languages: true,
});

const MovieListWithCastSchema = MovieListSchema.extend({
  credit_id: z.string(),
  character: z.string(),
  order: z.number(),
  media_type: z.string().optional(),
});

const MovieListWithCrewSchema = MovieListSchema.extend({
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
  media_type: z.string().optional(),
});

export const PickMovieListWithCast = MovieListWithCastSchema.pick({
  id: true,
  title: true,
  poster_path: true,
  backdrop_path: true,
  overview: true,
  release_date: true,
  vote_average: true,
  character: true,
  order: true,
  media_type: true,
});

export const PickMovieListWithCrew = MovieListWithCrewSchema.pick({
  id: true,
  title: true,
  poster_path: true,
  backdrop_path: true,
  overview: true,
  vote_average: true,
  department: true,
  job: true,
  media_type: true,
});
