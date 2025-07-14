import {
  IconBookmark,
  IconBookmarkOutline,
  IconFilm,
  IconFilmOutline,
  IconHeart,
  IconHeartOutline,
  IconHome,
  IconHomeOutline,
  IconThumbsUp,
  IconThumbsUpOutline,
  IconTv,
  IconTvOutline,
  IconUsers,
  IconUsersOutline,
} from "@/data/icons";

type MenuItem = {
  label: string;
  url: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconActive: React.ComponentType<{ className?: string }>;
  subItems?: Array<{
    label: string;
    url: string;
    description: string;
  }>;
};

export const menuSections = {
  publicSection: [
    {
      label: "Home",
      url: "/",
      description: "Home",
      icon: IconHomeOutline,
      iconActive: IconHome,
    },
    {
      label: "Movies",
      url: "/movie",
      description: "Movies",
      icon: IconFilmOutline,
      iconActive: IconFilm,
      subItems: [
        {
          label: "Popular",
          url: "/movie/popular",
          description: "Popular Movies",
        },
        {
          label: "Now Playing",
          url: "/movie/now-playing",
          description: "Now Playing Movies",
        },
        {
          label: "Upcoming",
          url: "/movie/upcoming",
          description: "Upcoming Movies",
        },
        {
          label: "Top Rated",
          url: "/movie/top-rated",
          description: "Top Rated Movies",
        },
      ],
    },
    {
      label: "TV Shows",
      url: "/tv",
      description: "TV Shows",
      icon: IconTvOutline,
      iconActive: IconTv,
      subItems: [
        {
          label: "Popular",
          url: "/tv/popular",
          description: "Popular TV Shows",
        },
        {
          label: "Airing Today",
          url: "/tv/airing-today",
          description: "Airing Today",
        },
        {
          label: "On TV",
          url: "/tv/on-the-air",
          description: "On The Air",
        },
        {
          label: "Top Rated",
          url: "/tv/top-rated",
          description: "Top Rated TV Shows",
        },
      ],
    },
    {
      label: "People",
      url: "/people",
      description: "Popular People",
      icon: IconUsersOutline,
      iconActive: IconUsers,
    },
  ] as MenuItem[],
  privateSection: [
    {
      label: "Watchlist",
      url: "/watchlist",
      description: "My Watchlist",
      icon: IconBookmarkOutline,
      iconActive: IconBookmark,
    },
    {
      label: "Favorites",
      url: "/favorites",
      description: "Favorites",
      icon: IconHeartOutline,
      iconActive: IconHeart,
    },
    {
      label: "Liked",
      url: "/liked",
      description: "Liked",
      icon: IconThumbsUpOutline,
      iconActive: IconThumbsUp,
    },
  ] as MenuItem[],
};
