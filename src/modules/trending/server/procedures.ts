import z from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { TMDBResponseSchema } from "@/data/zod/tmdb";
import { ConvertTMDBData } from "@/lib/convert-data";

const API_URL = process.env.TMDB_API_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
  next: { revalidate: 3600 },
};

export const trendingRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        category: z.enum(["movie", "person", "tv"]),
        timeWindow: z.enum(["day", "week"]).default("day"),
        cursor: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      params.append("page", input.cursor.toString());

      try {
        const tmdbRes = await fetch(
          `${API_URL}/trending/${input.category}/${input.timeWindow}?${params.toString()}`,
          options,
        );

        if (!tmdbRes.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TMDB",
            cause: tmdbRes.text(),
          });
        }

        const data = await tmdbRes.json();
        const convertData = ConvertTMDBData(data);

        const {
          success,
          error,
          data: trendingData,
        } = TMDBResponseSchema.safeParse(convertData);

        if (!success) {
          console.error(error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "[TRENDING_ROUTER | GET_MANY]: Failed to parsed MOVIE_LIST from TMDB",
            cause: error.issues,
          });
        }

        return trendingData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `[TRENDING_ROUTER | GET_MANY]: ${errorMessage}`,
        });
      }
    }),
});
