import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { PeopleListResponseSchema } from "@/data/zod/tmdb";
import { PickPeopleFullDetail } from "@/data/zod/tmdb/people";

const API_URL = process.env.TMDB_API_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
  next: { revalidate: 3600 },
};

export const peopleRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
      }),
    )
    .output(PeopleListResponseSchema)
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      params.append("page", input.cursor.toString());

      try {
        const tmdbRes = await fetch(
          `${API_URL}/person/popular?${params.toString()}`,
          options,
        );

        if (!tmdbRes.ok) {
          console.error(`[❌ PEOPLE_ROUTER | GETLIST]: ${tmdbRes.text()}`);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[PEOPLE_ROUTER | GETLIST]: Failed to fetch TMDB",
            cause: tmdbRes.text(),
          });
        }

        const data = await tmdbRes.json();

        const {
          success,
          error,
          data: peopleData,
        } = PeopleListResponseSchema.safeParse(data);

        if (!success) {
          console.error(`[❌ PEOPLE_ROUTER | GETLIST]: ${error.issues}`);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "[PEOPLE_ROUTER | GETLIST]: Failed to parsed PEOPLE_LIST from TMDB",
            cause: error.issues,
          });
        }

        return peopleData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[PEOPLE_ROUTER | GETLIST]: Internal Server Error",
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
          peopleResponse,
          socialResponse,
          creditsResponse,
          movieCredits,
          tvCredits,
        ] = await Promise.all([
          fetch(`${API_URL}/person/${input.id}`, options),
          fetch(`${API_URL}/person/${input.id}/external_ids`, options),
          fetch(`${API_URL}/person/${input.id}/combined_credits`, options),
          fetch(`${API_URL}/person/${input.id}/movie_credits`, options),
          fetch(`${API_URL}/person/${input.id}/tv_credits`, options),
        ]);

        if (!peopleResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "PEOPLE_GET_DETAIL: Failed to fetch People Details from TMDB",
            cause: await peopleResponse.text(),
          });
        }
        if (!socialResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "PEOPLE_GET_DETAIL: Failed to fetch People Social from TMDB",
            cause: await socialResponse.text(),
          });
        }
        if (!creditsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "PEOPLE_GET_DETAIL: Failed to fetch People Credits from TMDB",
            cause: await creditsResponse.text(),
          });
        }
        if (!movieCredits.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "PEOPLE_GET_DETAIL: Failed to fetch Movie Credits from TMDB",
            cause: await movieCredits.text(),
          });
        }
        if (!tvCredits.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "PEOPLE_GET_DETAIL: Failed to fetch TV Credits from TMDB",
            cause: await tvCredits.text(),
          });
        }

        const peopleData = await peopleResponse.json();
        const socialData = socialResponse.ok ? await socialResponse.json() : {};
        const creditsData = creditsResponse.ok
          ? await creditsResponse.json()
          : { cast: [] };
        const movieCreditsData = await movieCredits.json();

        const combinedPeopleData = {
          ...peopleData,
          social: socialData,
          known_for: creditsData.cast || [],
          movie_credits: movieCreditsData || [],
        };

        const {
          success,
          error,
          data: peopleDetailData,
        } = PickPeopleFullDetail.safeParse(combinedPeopleData);

        if (!success) {
          console.error(error.issues);

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parsed People Detail from TMDB",
            cause: error.issues,
          });
        }

        return peopleDetailData;
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
