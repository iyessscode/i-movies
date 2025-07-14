export type TLinkPrefix = "movie" | "tv" | "person";

export type TMovieCategory =
  | "popular"
  | "now_playing"
  | "upcoming"
  | "top_rated";

export type TTvCategory =
  | "popular"
  | "airing_today"
  | "on_the_air"
  | "top_rated";

export type TImageCard = {
  id: number;
  mediaType?: TLinkPrefix;
  imageUrl: string | null;
  title: string;
  description: string | null;
  voteAverage?: number;
  priority?: boolean;
};

export type TSearchData = {
  mediaType?: TLinkPrefix;
  id: number;
  title: string;
  imageUrl: string | null;
  descriptionLeft?: string | null;
  descriptionRight?: string | number | null;
  footer: string | string[] | null;
};
