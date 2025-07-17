import { z } from "zod";

export const BaseMediaSchema = z.object({
  id: z.number().default(0),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  genre_ids: z.array(z.number()).default([]),
  overview: z.string().default(""),
  popularity: z.number().default(0),
  vote_average: z.number().min(0).max(10),
  vote_count: z.number().default(0),
  original_language: z.string(),
});

export const BasePeopleSchema = z.object({
  id: z.number().default(0),
  name: z.string().min(1),
  gender: z.number().min(0).max(3).default(0),
  popularity: z.number().default(0),
  profile_path: z.string().nullable(),
  adult: z.boolean().default(false),
});

const BaseImageSchema = z.object({
  aspect_ratio: z.number().nullable(),
  height: z.number().nullable(),
  iso_639_1: z.string().nullable(),
  file_path: z.string(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
  width: z.number().nullable(),
});

export const BaseGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const BaseProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string().nullable(),
});

export const BaseProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const BaseSpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

const BaseCreditSchema = z.object({
  adult: z.boolean(),
  gender: z.number().default(0),
  id: z.number().default(0),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number().default(0),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
});

export const BaseCastSchema = BaseCreditSchema.extend({
  cast_id: z.number(),
  character: z.string(),
  order: z.number(),
});

export const BaseCrewSchema = BaseCreditSchema.extend({
  department: z.string(),
  job: z.string(),
});

export const BaseResultsSchema = z.object({
  id: z.number().default(0),
  mediaType: z.enum(["movie", "tv", "person"]).default("movie"),
  title: z.string(),
  imageUrl: z.object({
    posterUrl: z.string().nullish(),
    backdropUrl: z.string().nullish(),
    profileUrl: z.string().nullish(),
  }),
  detail: z.object({
    overview: z.string().optional(),
    releaseDate: z.string().optional(),
    gender: z.string().optional(),
    department: z.string().optional(),
    knownFor: z.string().optional(),
    character: z.string().optional(),
    job: z.string().optional(),
  }),
  popularity: z.number().optional(),
  voteAverage: z.string().optional(),
});

const BaseVideoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

const BaseReviewAuthorSchema = z.object({
  name: z.string().nullable(),
  username: z.string(),
  avatar_path: z.string().nullable(),
  rating: z.number().nullable(),
});

export const PickCast = BaseCastSchema.pick({
  id: true,
  name: true,
  profile_path: true,
  character: true,
  known_for_department: true,
});

export const PickCrew = BaseCrewSchema.pick({
  id: true,
  name: true,
  profile_path: true,
  job: true,
  known_for_department: true,
});

export const PickVideo = BaseVideoSchema.pick({
  id: true,
  name: true,
  type: true,
  site: true,
  key: true,
});

export const PickImage = BaseImageSchema.pick({
  aspect_ratio: true,
  height: true,
  width: true,
  file_path: true,
});

const PickReviewAuthor = BaseReviewAuthorSchema.pick({
  avatar_path: true,
  rating: true,
});

export const PickReview = z.object({
  author: z.string(),
  author_details: PickReviewAuthor,
  content: z.string(),
  id: z.string(),
  created_at: z.string(),
});
