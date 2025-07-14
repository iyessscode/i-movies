import { IconHome } from "@/data/icons";
import { menuSections } from "@/data/menu-sections";

type BreadcrumbItem = {
  href?: string;
  label: string;
  isCurrent?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

export const generateBreadcrumbs = (
  pathname: string,
  title?: string,
): BreadcrumbItem[] => {
  if (!pathname) return [];

  const paths = pathname.split("/").filter((path) => path !== "");
  const crumbs: BreadcrumbItem[] = [];

  crumbs.push({
    href: "/",
    label: "Home",
    isCurrent: false,
    icon: IconHome,
  });

  const allMenuItems = [
    ...menuSections.publicSection,
    ...menuSections.privateSection,
  ];

  let currentPath = "";
  for (let i = 0; i < paths.length; i++) {
    currentPath += `/${paths[i]}`;
    const matchedItem = allMenuItems.find((item) => item.url === currentPath);

    if (i === 1 && paths[0] === "movie" && paths[1] === "detail" && title) {
      crumbs.push({
        label: title,
        isCurrent: true,
      });
      break;
    }

    if (matchedItem) {
      crumbs.push({
        href: matchedItem.url,
        label: matchedItem.label,
        isCurrent: i === paths.length - 1,
        icon:
          i === paths.length - 1 ? matchedItem.iconActive : matchedItem.icon,
      });

      if (matchedItem.subItems && i < paths.length - 1) {
        const subPath = currentPath + `/${paths[i + 1]}`;
        const matchedSubItem = matchedItem.subItems.find(
          (item) => item.url === subPath,
        );

        if (matchedSubItem) {
          crumbs.push({
            href: matchedSubItem.url,
            label: matchedSubItem.label,
            isCurrent: i + 1 === paths.length - 1,
          });
          i++;
        }
      }
    } else if (i === paths.length - 1 && title) {
      crumbs.push({
        label: title,
        isCurrent: true,
      });
    }
  }

  return crumbs;
};
