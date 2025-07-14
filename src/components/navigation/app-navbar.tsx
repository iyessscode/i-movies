"use client";

import { Tektur } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { IconMenu } from "@/data/icons";
import { useScrollVisible } from "@/hooks/use-scroll-visible";
import { cn } from "@/lib/utils";

import { NavbarUserButton } from "@/components/navigation/navbar-user-button";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

type Props = {
  collapsible?: "offcanvas" | "icon" | "none";
};

export const AppNavbar = ({ collapsible = "icon" }: Props) => {
  const { toggleSidebar, open } = useSidebar();
  const { isVisible } = useScrollVisible();

  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 flex w-full items-center border-b transition-transform duration-300",
        collapsible === "icon" || open
          ? "translate-y-0"
          : isVisible
            ? "translate-y-0"
            : "-translate-y-full",
      )}
    >
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2.5 bg-transparent"
            onClick={toggleSidebar}
          >
            <IconMenu />
          </Button>
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo.svg" alt="LOGO" height={32} width={32} priority />
            <span className={cn("font-bold text-white", tektur.className)}>
              I MOVIES
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <SearchInput />
          <NavbarUserButton />
        </div>
      </div>
    </header>
  );
};
