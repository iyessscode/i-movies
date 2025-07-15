import Link from "next/link";

import { IconHome } from "@/data/icons";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

type BreadcrumbsProps = {
  className?: string;
  title?: string;
  customItems?: Array<{
    label: string;
    href?: string;
    isCurrent?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
};

export const Breadcrumbs = ({
  className,
  title,
  customItems,
}: BreadcrumbsProps) => {
  const defaultItems = useBreadcrumbs(title);
  const items = customItems || defaultItems;

  if (items.length === 0) return null;

  return (
    <Breadcrumb
      className={cn(
        "bg-background/40 hidden rounded-full p-4 md:block",
        className,
      )}
    >
      <BreadcrumbList>
        {items.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage className="text-primary flex items-center gap-1 font-bold">
                    {IconComponent && <IconComponent className="size-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="hover:text-foreground flex items-center gap-1"
                    >
                      {IconComponent && <IconComponent className="size-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1">
                    {IconComponent && <IconComponent className="size-4" />}
                    {item.label}
                  </span>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const BreadcrumbsSkeleton = () => {
  return (
    <Breadcrumb className="bg-background/40 hidden rounded-full p-4 md:block">
      <BreadcrumbList>
        <div className="flex items-center gap-2.5">
          <BreadcrumbItem>
            <BreadcrumbPage className="text-muted-foreground flex items-center gap-1">
              <IconHome className="size-4" />
              Home
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <Skeleton className="bg-primary/20 h-5 w-20" />
          <BreadcrumbSeparator />
          <Skeleton className="bg-primary/20 h-5 w-20" />
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
