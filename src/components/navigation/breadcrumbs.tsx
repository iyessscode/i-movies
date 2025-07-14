import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    <Breadcrumb className={cn("mb-4 hidden md:block", className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage className="text-primary flex items-center gap-1 font-bold">
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="hover:text-primary flex items-center gap-1"
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1">
                    {IconComponent && <IconComponent className="h-4 w-4" />}
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
