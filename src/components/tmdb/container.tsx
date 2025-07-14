import Link from "next/link";
import React from "react";

import { IconChevronRight } from "@/data/icons";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

type ContainerProps = {
  label: string;
  showBorder?: boolean;
  linkShowMore?: string;
  labelShowMore?: string;
  children: React.ReactNode;
};

export const Container = ({
  label,
  showBorder = true,
  linkShowMore,
  labelShowMore,
  children,
}: ContainerProps) => {
  return (
    <section className="container">
      <header className="flex items-center justify-between">
        <h1
          aria-label={label}
          className={cn(
            "text-base font-semibold md:text-lg lg:text-xl",
            showBorder && "border-l-primary border-l-4 px-4",
          )}
        >
          {label}
        </h1>
        {linkShowMore && (
          <Link
            href={linkShowMore}
            aria-label={label}
            className="group flex items-center"
          >
            <span className="text-primary group-hover:text-primary/80 text-sm md:text-base">
              {labelShowMore ? labelShowMore : "See more"}
            </span>
            <IconChevronRight className="text-primary group-hover:text-primary/80 ml-1 size-4 md:size-5" />
          </Link>
        )}
      </header>
      <main className="relative mt-4 text-sm md:text-base">{children}</main>
    </section>
  );
};

export const ContainerSkeleton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="container">
      <header className="flex items-center justify-between">
        <Skeleton className="h-9 w-36" />
      </header>
      <main className="relative mt-4 text-sm md:text-base">{children}</main>
    </section>
  );
};
