import z from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { TvListResponseSchema } from "@/data/zod/tmdb";
import { PickTvFullDetail } from "@/data/zod/tmdb/tv";

const API_URL = process.env.TMDB_API_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
  next: { revalidate: 3600 },
};

export const tvRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(
      z.object({
        category: z.string().default("popular"),
        cursor: z.number().default(1),
      }),
    )
    .output(TvListResponseSchema)
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      params.append("page", input.cursor.toString());

      const category = input.category.replace(/-/g, "_");

      try {
        const tmdbRes = await fetch(
          `${API_URL}/tv/${category}?${params.toString()}`,
          options,
        );

        if (!tmdbRes.ok) {
          console.error(`[❌ TV_ROUTER | GET_MANY]: ${tmdbRes.text()}`);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[TV_ROUTER | GET_MANY]: Failed to fetch TMDB",
            cause: tmdbRes.text(),
          });
        }

        const data = await tmdbRes.json();

        const {
          success,
          error,
          data: tvData,
        } = TvListResponseSchema.safeParse(data);

        if (!success) {
          console.error(error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "[TV_ROUTER | GET_MANY]: Failed to parsed TV_LIST from TMDB",
            cause: error.issues,
          });
        }


        return tvData;
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[TV_ROUTER | GET_MANY]: Internal Server Error",
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
          tvResponse,
          creditsResponse,
          videosResponse,
          imagesResponse,
          reviewsResponse,
          recommendationsResponse,
          similarResponse,
          // seasonDetailsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/tv/${input.id}`, options),
          fetch(`${API_URL}/tv/${input.id}/credits`, options),
          fetch(`${API_URL}/tv/${input.id}/videos`, options),
          fetch(`${API_URL}/tv/${input.id}/images`, options),
          fetch(`${API_URL}/tv/${input.id}/reviews`, options),
          fetch(`${API_URL}/tv/${input.id}/recommendations`, options),
          fetch(`${API_URL}/tv/${input.id}/similar`, options),
          // Fetch season details for each season
          // fetch(`${API_URL}/tv/${input.id}`, options).then(async (res) => {
          //   const showData = await res.json();
          //   if (showData.seasons) {
          //     return Promise.all(
          //       showData.seasons.map((season: { season_number: number }) =>
          //         fetch(
          //           `${API_URL}/tv/${input.id}/season/${season.season_number}`,
          //           options,
          //         ).then((res) => res.json()),
          //       ),
          //     );
          //   }
          //   return [];
          // }),
        ]);

        if (!tvResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show details from TMDB",
            cause: await tvResponse.text(),
          });
        }
        if (!creditsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show credits from TMDB",
            cause: await creditsResponse.text(),
          });
        }
        if (!videosResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show videos from TMDB",
            cause: await videosResponse.text(),
          });
        }
        if (!imagesResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show images from TMDB",
            cause: await imagesResponse.text(),
          });
        }
        if (!reviewsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show reviews from TMDB",
            cause: await reviewsResponse.text(),
          });
        }
        if (!recommendationsResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch TV show recommendations from TMDB",
            cause: await recommendationsResponse.text(),
          });
        }
        if (!similarResponse.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch similar TV shows from TMDB",
            cause: await similarResponse.text(),
          });
        }

        const tvData = await tvResponse.json();
        const creditsData = await creditsResponse.json();
        const videosData = await videosResponse.json();
        const imagesData = await imagesResponse.json();
        const reviewsData = await reviewsResponse.json();
        const recommendationsData = await recommendationsResponse.json();
        const similarData = await similarResponse.json();

        const combinedTvData = {
          ...tvData,
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
          data: tvDetailData,
        } = PickTvFullDetail.safeParse(combinedTvData);
        
        if (!success) {
          console.error("🚀[ERROR]: ", error.issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse TV show data from TMDB",
            cause: error.issues,
          });
        }

        return tvDetailData;
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
