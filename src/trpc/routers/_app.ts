import { createTRPCRouter } from "@/trpc/init";

import { movieRouter } from "@/modules/movie/server/procedures";
import { peopleRouter } from "@/modules/people/server/procedures";
import { searchRouter } from "@/modules/search/server/procedures";
import { trendingRouter } from "@/modules/trending/server/procedures";
import { tvRouter } from "@/modules/tv/server/procedures";

export const appRouter = createTRPCRouter({
  trending: trendingRouter,
  movies: movieRouter,
  tv: tvRouter,
  people: peopleRouter,
  search: searchRouter,
});
export type AppRouter = typeof appRouter;
