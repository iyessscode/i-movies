import { IconHome } from "@/data/icons";
import { menuSections } from "@/data/menu-sections";

type BreadcrumbItem = {
  href?: string;
  label: string;
  isCurrent?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

const getSectionLabel = (section: string, isPlural: boolean) => {
  switch (section) {
    case "movie":
      return isPlural ? "Movies" : "Movie";
    case "tv":
      return isPlural ? "TV Shows" : "TV Show";
    case "people":
      return isPlural ? "People" : "Person";
    default:
      return section;
  }
};

const getSubpageLabel = (subpage: string) => {
  switch (subpage) {
    case "credits":
      return "Full Cast & Crew";
    case "media":
      return "Media";
    case "similar":
      return "Similar";
    default:
      return subpage
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }
};

export const generateBreadcrumbs = (
  pathname: string,
  title?: string,
): BreadcrumbItem[] => {
  if (!pathname) return [];

  const paths = pathname.split("/").filter((path) => path !== "");
  const crumbs: BreadcrumbItem[] = [];

  // Always add Home with icon
  crumbs.push({
    href: "/",
    label: "Home",
    isCurrent: false,
    icon: IconHome,
  });

  if (paths.length === 0) return crumbs;

  const section = paths[0];
  const menuItem = [
    ...menuSections.publicSection,
    ...menuSections.privateSection,
  ].find((item) => item.url === `/${section}`);

  // Handle base section (e.g., /movie, /tv, /people)
  if (paths.length === 1) {
    if (section === "advance-search") {
      crumbs.push({
        href: `/${section}`,
        label: getSectionLabel(section, true), // Plural
        isCurrent: true,
        icon: menuItem?.icon,
      });
    } else {
      crumbs.push({
        href: `/${section}`,
        label: `Trending ${getSectionLabel(section, true)}`, // Plural
        isCurrent: true,
        icon: menuItem?.icon,
      });
    }
    return crumbs;
  }

  // Add section link - singular when in detail path
  const isDetailPath = paths.length >= 3 && paths[1] === "detail";
  crumbs.push({
    href: `/${section}`,
    label: getSectionLabel(section, !isDetailPath), // Plural unless detail path
    isCurrent: false,
    icon: menuItem?.icon,
  });

  // Handle detail pages (e.g., /movie/detail/123)
  if (isDetailPath) {
    if (title) {
      crumbs.push({
        href: `/${section}/detail/${paths[2]}`,
        label: title,
        isCurrent: paths.length === 3,
      });
    }

    // Handle subpages (e.g., /movie/detail/123/credits)
    if (paths.length === 4) {
      crumbs.push({
        label: getSubpageLabel(paths[3]),
        isCurrent: true,
      });
    }
    return crumbs;
  }

  // Handle other paths (e.g., /movie/popular)
  if (paths.length === 2) {
    const subItem = menuItem?.subItems?.find(
      (item) => item.url === `/${section}/${paths[1]}`,
    );

    if (subItem) {
      crumbs.push({
        href: subItem.url,
        label: subItem.label,
        isCurrent: true,
      });
    } else {
      crumbs.push({
        label: paths[1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        isCurrent: true,
      });
    }
  }

  return crumbs;
};
