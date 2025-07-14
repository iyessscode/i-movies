import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Languages } from "@/data/languages";
import { TImageCard } from "@/data/types";
import { TMedia, TMediaList } from "@/data/zod/tmdb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(seed: string): string {
  return createAvatar(botttsNeutral, {
    seed,
  }).toDataUri();
}

export function formatDate(input: string | Date, type?: "year"): string {
  const date = typeof input === "string" ? new Date(input.trim()) : input;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };

  const formatted = date.toLocaleDateString("en-US", options);
  const [month, day, year] = formatted.split(" ");
  return type === "year"
    ? `${year}`
    : `${month} ${day.replace(",", "")}, ${year}`;
}

export function convertGender(code: number): string {
  if (code === 1) {
    return "Female";
  } else if (code === 2) {
    return "Male";
  } else if (code === 3) {
    return "Non-Binary";
  } else {
    return "Not Specified";
  }
}

export const convertDataImage = ({
  allData,
  isPoster = true,
}: {
  allData: TMediaList[];
  isPoster?: boolean;
}): TImageCard[] => {
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
      mediaType: undefined,
      imageUrl: null,
      title: "",
      description: null,
      voteAverage: 0,
    };
  });
};

export function formatDuration(totalMinutes: number, type?: "full"): string {
  if (totalMinutes < 0) {
    return "Invalid input: Minutes cannot be negative.";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return type === "full"
      ? `${hours} hours ${minutes} minutes`
      : `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return type === "full" ? `${hours} hours` : `${hours}h`;
  } else {
    return type === "full" ? `${minutes} minutes` : `${minutes}m`;
  }
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export const getLanguageFromCode = (code: string) => {
  const found = Languages.find((lang) => lang.code === code);
  return (
    found || {
      code,
      name: code.toUpperCase(),
      nativeName: code.toUpperCase(),
    }
  );
};

export function countAge(
  birthDate: string | Date,
  asOfDate?: string | Date,
): number {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const asOf = asOfDate
    ? typeof asOfDate === "string"
      ? new Date(asOfDate)
      : asOfDate
    : new Date();

  if (isNaN(birth.getTime())) {
    throw new Error("Invalid birth date");
  }
  if (isNaN(asOf.getTime())) {
    throw new Error("Invalid reference date");
  }

  let age = asOf.getFullYear() - birth.getFullYear();
  const monthDiff = asOf.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
