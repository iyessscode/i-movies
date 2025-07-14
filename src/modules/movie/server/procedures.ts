import z from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import {
  MovieCreditsResponseSchema,
  MovieListResponseSchema,
} from "@/data/zod/tmdb";
import { PickMovieFullDetail } from "@/data/zod/tmdb/movie";

const API_URL = process.env.TMDB_API_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
  next: { revalidate: 3600 },
};

export const movieRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        category: z.string().default("popular"),
        cursor: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      params.append("page", input.cursor.toString());

      const category = input.category.replace(/-/g, "_");

      try {
        const tmdbRes = await fetch(
          `${API_URL}/movie/${category}?${params.toString()}`,
          options,
        );

        if (!tmdbRes.ok) {
          console.error(`[❌ MOVIE_ROUTER | GET_MANY]: ${tmdbRes.text()}`);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[MOVIE_ROUTER | GET_MANY]: Failed to fetch TMDB",
            cause: tmdbRes.text(),
          });
        }

        const data = await tmdbRes.json();

        const {
          success,
          error,
          data: movieData,
        } = MovieListResponseSchema.safeParse(data);

        if (!success) {
          console.error(error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "[MOVIE_ROUTER | GET_MANY]: Failed to parsed MOVIE_LIST from TMDB",
            cause: error.issues,
          });
        }

        return movieData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[MOVIE_ROUTER | GET_MANY]: Internal Server Error",
          cause: errorMessage,
        });
      }
    }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const [
          movieResponse,
          creditsResponse,
          videosResponse,
          imagesResponse,
          reviewsResponse,
          recommendationsResponse,
          similarResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/movie/${input.id}`, options),
          fetch(`${API_URL}/movie/${input.id}/credits`, options),
          fetch(`${API_URL}/movie/${input.id}/videos`, options),
          fetch(`${API_URL}/movie/${input.id}/images`, options),
          fetch(`${API_URL}/movie/${input.id}/reviews`, options),
          fetch(`${API_URL}/movie/${input.id}/recommendations`, options),
          fetch(`${API_URL}/movie/${input.id}/similar`, options),
        ]);

        if (!movieResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie details from TMDB",
            cause: await movieResponse.text(),
          });
        }
        if (!creditsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie credits from TMDB",
            cause: await creditsResponse.text(),
          });
        }
        if (!videosResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie videos from TMDB",
            cause: await videosResponse.text(),
          });
        }
        if (!imagesResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie images from TMDB",
            cause: await imagesResponse.text(),
          });
        }
        if (!reviewsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie reviews from TMDB",
            cause: await reviewsResponse.text(),
          });
        }
        if (!recommendationsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie recommendations from TMDB",
            cause: await recommendationsResponse.text(),
          });
        }
        if (!similarResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch similar movies from TMDB",
            cause: await similarResponse.text(),
          });
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();
        const videosData = await videosResponse.json();
        const imagesData = await imagesResponse.json();
        const reviewsData = await reviewsResponse.json();
        const recommendationsData = await recommendationsResponse.json();
        const similarData = await similarResponse.json();

        const combinedMovieData = {
          ...movieData,
          credits: creditsData,
          videos: videosData,
          images: imagesData,
          reviews: reviewsData,
          recommendations: recommendationsData,
          similar: similarData,
        };

        const {
          success,
          error,
          data: movieDetailData,
        } = PickMovieFullDetail.safeParse(combinedMovieData);

        if (!success) {
          console.error("🚀[ERROR]: ", error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse movie data from TMDB",
            cause: error.issues,
          });
        }

        return movieDetailData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
          cause: errorMessage,
        });
      }
    }),

  getCredits: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`${API_URL}/movie/${input.id}`, options),
          fetch(`${API_URL}/movie/${input.id}/credits`, options),
        ]);

        if (!movieResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie details from TMDB",
            cause: await movieResponse.text(),
          });
        }
        if (!creditsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch movie credits from TMDB",
            cause: await creditsResponse.text(),
          });
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        const combinedData = {
          ...creditsData,
          title: movieData.title,
        };

        const {
          success,
          error,
          data: movieCreditsData,
        } = MovieCreditsResponseSchema.safeParse(combinedData);

        if (!success) {
          console.error("🚀[ERROR]: ", error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse movie data from TMDB",
            cause: error.issues,
          });
        }

        return movieCreditsData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
          cause: errorMessage,
        });
      }
    }),
});
