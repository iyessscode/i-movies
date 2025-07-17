import {  TLinkPrefix } from "@/data/types";
import { TMedia, TMediaList } from "@/data/zod/tmdb";
import { formatDate } from "@/lib/utils";

type ReturnType = {
  id: number;
  mediaType: TLinkPrefix;
  imageUrl: string | null;
  title: string;
  description: string | null;
  voteAverage?: number;
  priority?: boolean;
};

export const convertDataGrid = ({
  allData,
  isPoster = true,
}: {
  allData: TMediaList[];
  isPoster?: boolean;
}): ReturnType[] => {
  return allData.map((data) => {
    if ("media_type" in data && data.media_type === "movie") {
      return {
        id: data.id,
        mediaType: "movie",
        imageUrl: isPoster ? data.poster_path : data.backdrop_path,
        title: data.title,
        description: data.release_date ? formatDate(data.release_date) : null,
        voteAverage: data.vote_average,
      };
    } else if ("title" in data) {
      return {
        id: data.id,
        mediaType: "movie",
        imageUrl: isPoster ? data.poster_path : data.backdrop_path,
        title: data.title,
        description: data.release_date ? formatDate(data.release_date) : null,
        voteAverage: data.vote_average,
      };
    } else if ("media_type" in data && data.media_type === "tv") {
      return {
        id: data.id,
        mediaType: "tv",
        imageUrl: isPoster ? data.poster_path : data.backdrop_path,
        title: data.name,
        description: data.first_air_date
          ? formatDate(data.first_air_date)
          : null,
        voteAverage: data.vote_average,
      };
    } else if ("name" in data && "first_air_date" in data) {
      return {
        id: data.id,
        mediaType: "tv",
        imageUrl: isPoster ? data.poster_path : data.backdrop_path,
        title: data.name,
        description: data.first_air_date
          ? formatDate(data.first_air_date)
          : null,
        voteAverage: data.vote_average,
      };
    } else if ("media_type" in data && data.media_type === "person") {
      return {
        id: data.id,
        mediaType: "person",
        imageUrl: data.profile_path,
        title: data.name,
        description:
          data.known_for
            ?.slice(0, 3)
            .map((knownData: TMedia) =>
              "title" in knownData ? knownData.title : knownData.name,
            )
            .join(", ") || null,
        voteAverage: 0,
      };
    } else if ("profile_path" in data) {
      return {
        id: data.id,
        mediaType: "person",
        imageUrl: data.profile_path,
        title: data.name || "",
        description:
          "known_for" in data
            ? data.known_for
                ?.slice(0, 3)
                .map((knownData: TMedia) =>
                  "title" in knownData ? knownData.title : knownData.name,
                )
                .join(", ") || null
            : null,
        voteAverage: 0,
      };
    }
    return {
      id: 0,
      mediaType: "movie",
      imageUrl: null,
      title: "",
      description: null,
      voteAverage: 0,
    };
  });
};
