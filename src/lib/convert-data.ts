import { TLinkPrefix } from "@/data/types";
import { TBaseResults, TMedia, TResponse } from "@/data/zod/tmdb";
import { convertGender, formatDate } from "@/lib/utils";

type ResultType = {
  id: number;
  media_type?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  profile_path?: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  known_for?: Array<TMedia>;
  gender?: number;
  department?: string;
  known_for_department?: string;
  overview?: string;
  popularity?: number;
  job?: string;
  character?: string;
};

type ResponseType = {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Array<ResultType>;
  total_pages: number;
  total_results: number;
};

export const ConvertTMDBData = (allData: ResponseType): TResponse => {
  if (allData.dates) {
    const minDate = new Date(allData.dates.minimum);
    const maxDate = new Date(allData.dates.maximum);

    allData.results = allData.results.filter((data) => {
      const releaseDate = data.release_date
        ? new Date(data.release_date)
        : null;
      return releaseDate && releaseDate >= minDate && releaseDate <= maxDate;
    });
  }

  const resultsData = ConvertResultData(allData.results);

  return {
    ...allData,
    results: resultsData,
  };
};

export const ConvertResultData = (
  results: Array<ResultType>,
): Array<TBaseResults> => {
  return results.map((data): TBaseResults => {
    // Base properties for all media types
    const base: Omit<TBaseResults, "mediaType" | "detail"> & {
      mediaType: TLinkPrefix;
      detail: {
        overview?: string;
        releaseDate?: string;
        gender?: string;
        department?: string;
        knownFor?: string;
        popularity?: number;
        job?: string;
        character?: string;
      };
    } = {
      id: data.id,
      mediaType: "movie",
      title: data.title || data.name || "Unknown Title",
      voteAverage: data.vote_average ? data.vote_average.toFixed(1) : "0.0",
      popularity: data.popularity,
      imageUrl: {
        posterUrl: data.poster_path ?? null,
        backdropUrl: data.backdrop_path ?? null,
        profileUrl: data.profile_path ?? null,
      },
      detail: {
        overview: data.overview,
        releaseDate: undefined,
        gender: data.gender ? convertGender(data.gender) : undefined,
        department: data.known_for_department || data.department,
        knownFor: undefined,
        popularity: data.popularity,
        job: data.job,
        character: data.character,
      },
    };

    if (data.media_type === "movie" || ("title" in data && data.title)) {
      return {
        ...base,
        mediaType: "movie",
        detail: {
          ...base.detail,
          releaseDate: data.release_date
            ? formatDate(data.release_date)
            : undefined,
        },
      };
    }

    // Handle TV type
    if (data.media_type === "tv" || ("name" in data && data.first_air_date)) {
      return {
        ...base,
        mediaType: "tv",
        detail: {
          ...base.detail,
          releaseDate: data.first_air_date
            ? formatDate(data.first_air_date)
            : undefined,
        },
      };
    }

    // Handle person type
    if (
      data.media_type === "person" ||
      ("profile_path" in data && data.profile_path)
    ) {
      return {
        ...base,
        mediaType: "person",
        detail: {
          ...base.detail,
          gender: convertGender(data.gender!),
          knownFor: data.known_for
            ?.slice(0, 3)
            .map((knownData: TMedia) =>
              "title" in knownData ? knownData.title : knownData.name,
            )
            .join(", "),
        },
      };
    }

    // Fallback for unknown types
    return {
      ...base,
      mediaType: "movie",
    };
  });
};
