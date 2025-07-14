import z from "zod";

import {
  BaseCastSchema,
  BaseCrewSchema,
  BaseGenreSchema,
  PickCast,
  PickCrew,
  PickImage,
  PickReview,
  PickVideo,
} from "@/data/zod/tmdb/base";
import {
  PickMovieFullDetail,
  PickMovieList,
  PickMovieListWithCast,
  PickMovieListWithMediaType,
} from "@/data/zod/tmdb/movie";
import {
  PickPeopleList,
  PickPeopleListWithMediaType,
} from "@/data/zod/tmdb/people";
import {
  PickTvList,
  PickTvListWithMediaType,
  TvEpisodeSchema,
  TvSeasonSchema,
} from "@/data/zod/tmdb/tv";

export const MovieListResponseSchema = z.object({
  dates: z
    .object({
      maximum: z.string(),
      minimum: z.string(),
    })
    .optional(),
  page: z.number(),
  results: z.array(PickMovieList),
  total_pages: z.number(),
  total_results: z.number(),
});

export const TvListResponseSchema = z.object({
  page: z.number(),
  results: z.array(PickTvList),
  total_pages: z.number(),
  total_results: z.number(),
});

export const PeopleListResponseSchema = z.object({
  page: z.number().int().positive(),
  results: z.array(PickPeopleList),
  total_pages: z.number().int().nonnegative(),
  total_results: z.number().int().nonnegative(),
});

const MediaWithMediaTypeSchema = z.discriminatedUnion("media_type", [
  PickTvListWithMediaType,
  PickMovieListWithMediaType,
  PickPeopleListWithMediaType,
]);

export const MediaListResponseSchema = z.object({
  page: z.number().int().positive(),
  results: z.array(MediaWithMediaTypeSchema),
  total_pages: z.number().int().nonnegative(),
  total_results: z.number().int().nonnegative(),
});

export const MovieCreditsResponseSchema = z.object({
  id: z.number().default(0),
  title: z.string(),
  cast: z.array(BaseCastSchema),
  crew: z.array(BaseCrewSchema),
});

export type TPickMovieList = z.infer<typeof PickMovieList>;
export type TPickTvList = z.infer<typeof PickTvList>;
export type TPickPeopleList = z.infer<typeof PickPeopleList>;

export type TPickTvListWithMediaType = z.infer<typeof PickTvListWithMediaType>;
export type TPickMovieListWithMediaType = z.infer<
  typeof PickMovieListWithMediaType
>;
export type TPickPeopleListWithMediaType = z.infer<
  typeof PickPeopleListWithMediaType
>;

export type TMedia = TPickMovieList | TPickTvList | TPickPeopleList;
export type TMediaWithMediaType =
  | TPickTvListWithMediaType
  | TPickMovieListWithMediaType
  | TPickPeopleListWithMediaType;

export type TMediaList = TMedia | TMediaWithMediaType;
export type TGenre = z.infer<typeof BaseGenreSchema>;
export type TPickCrew = z.infer<typeof PickCrew>;
export type TPickCast = z.infer<typeof PickCast>;
export type TMovieFullDetail = z.infer<typeof PickMovieFullDetail>;
export type TPickVideo = z.infer<typeof PickVideo>;
export type TPickImage = z.infer<typeof PickImage>;
export type TPickReview = z.infer<typeof PickReview>;
export type TTvEpisode = z.infer<typeof TvEpisodeSchema>;
export type TTvSeason = z.infer<typeof TvSeasonSchema>;
export type TMovieListWithCast = z.infer<typeof PickMovieListWithCast>;
