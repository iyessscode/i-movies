import z from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { TMDBResponseSchema, TMediaWithMediaType } from "@/data/zod/tmdb";
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

export const searchRouter = createTRPCRouter({
  searchQuery: publicProcedure
    .input(
      z.object({
        query: z.string().default(""),
        category: z.enum(["multi", "movie", "person", "tv"]).default("multi"),
        cursor: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();

      params.append("query", input.query);
      params.append("page", input.cursor.toString());

      try {
        const tmdbRes = await fetch(
          `${API_URL}/search/${input.category}?${params.toString()}`,
          options,
        );

        if (!tmdbRes.ok) {
          console.error(
            `[❌ SEARCH_ROUTER | SEARCH_QUERY]: ${await tmdbRes.text()}`,
          );
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[SEARCH_ROUTER | SEARCH_QUERY]: Failed to fetch TMDB",
            cause: tmdbRes.text(),
          });
        }

        const data = await tmdbRes.json();

        const filteredData = {
          ...data,
          results:
            data.results?.filter((result: TMediaWithMediaType) =>
              ["movie", "tv", "person"].includes(result.media_type),
            ) || [],
        };

        const convertData = ConvertTMDBData(filteredData);

        const {
          success,
          error,
          data: searchData,
        } = TMDBResponseSchema.safeParse(convertData);

        if (!success) {
          console.error(error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "[SEARCH_ROUTER | SEARCH_QUERY]: Failed to parsed SEARCH_QUERY from TMDB",
            cause: error.issues,
          });
        }

        return searchData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `[SEARCH_ROUTER | SEARCH_QUERY]: ${errorMessage}`,
        });
      }
    }),

  searchById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        category: z.enum(["movie", "tv", "person"]),
      }),
    )
    .query(async ({ input }) => {
      const tmdbRes = await fetch(
        `${API_URL}/${input.category}/${input.id}`,
        options,
      );

      if (!tmdbRes.ok) {
        console.error(
          `[❌ SEARCH_ROUTER | SEARCH_BY_ID]: ${await tmdbRes.text()}`,
        );
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "[SEARCH_ROUTER | SEARCH_BY_ID]: Failed to fetch TMDB",
          cause: tmdbRes.text(),
        });
      }

      const data = await tmdbRes.json();
      return data;
    }),
});
