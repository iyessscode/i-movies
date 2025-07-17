import { z } from "zod";

import { BasePeopleSchema, BaseResultsSchema } from "@/data/zod/tmdb/base";
import {
  PickMovieListWithCast,
  PickMovieListWithCrew,
  PickMovieListWithMediaType,
} from "@/data/zod/tmdb/movie";
import { PickTvListWithMediaType } from "@/data/zod/tmdb/tv";

const MediaUnionSchema = z.discriminatedUnion("media_type", [
  PickMovieListWithMediaType,
  PickTvListWithMediaType,
]);

const PeopleListSchema = BasePeopleSchema.extend({
  known_for: z.array(MediaUnionSchema),
  known_for_department: z.string().nullish(),
});

export const PickPeopleList = PeopleListSchema.pick({
  id: true,
  name: true,
  profile_path: true,
  known_for: true,
});

const PeopleListWithMediaType = PeopleListSchema.extend({
  media_type: z.literal("person"),
});

export const PickPeopleListWithMediaType = PeopleListWithMediaType.pick({
  id: true,
  name: true,
  gender: true,
  profile_path: true,
  known_for_department: true,
  known_for: true,
  popularity: true,
  media_type: true,
});

const PeopleSocialSchema = z
  .object({
    id: z.number().positive().default(0),
    imdb_id: z.string().nullable(),
    facebook_id: z.string().nullable(),
    instagram_id: z.string().nullable(),
    twitter_id: z.string().nullable(),
    tiktok_id: z.string().nullable(),
    youtube_id: z.string().nullable(),
    freebase_mid: z.string().nullable(),
    freebase_id: z.string().nullable(),
    tvrage_id: z.number().nullable(),
    wikidata_id: z.string().nullable(),
  })
  .partial();

const PeopleDetailSchema = BasePeopleSchema.extend({
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string().nullable(),
  deathday: z.string().nullable(),
  homepage: z.string().url().nullable(),
  imdb_id: z.string().nullable(),
  known_for_department: z.string(),
  place_of_birth: z.string().nullable(),
});

const PeopleFullDetailSchema = PeopleDetailSchema.extend({
  known_for: z.array(BaseResultsSchema),
  social: PeopleSocialSchema,
  movie_credits: z.object({
    id: z.number().default(0),
    cast: z.array(PickMovieListWithCast),
    crew: z.array(PickMovieListWithCrew),
  }),
});

export const PickPeopleFullDetail = PeopleFullDetailSchema.pick({
  id: true,
  profile_path: true,
  name: true,
  biography: true,
  known_for: true,
  social: true,
  known_for_department: true,
  gender: true,
  birthday: true,
  deathday: true,
  place_of_birth: true,
  also_known_as: true,
  movie_credits: true,
});
