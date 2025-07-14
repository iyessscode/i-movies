"use client";

import { Tektur } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { IconMenu } from "@/data/icons";
import { menuSections } from "@/data/menu-sections";
import { cn } from "@/lib/utils";

import { SidebarSection } from "@/components/navigation/sidebar-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

type Props = {
  collapsible?: "offcanvas" | "icon" | "none";
};

export const AppSidebar = ({ collapsible = "icon" }: Props) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible={collapsible}
    >
      <SidebarHeader className="top-(--header-height) h-[calc(100svh-var(--header-height))]! md:hidden">
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-0.5 bg-transparent"
            onClick={toggleSidebar}
          >
            <IconMenu />
          </Button>
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo.svg" alt="LOGO" height={32} width={32} />
            <span className={cn("font-bold text-white", tektur.className)}>
              I MOVIES
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection items={menuSections.publicSection} />
        <Separator />
        <SidebarSection items={menuSections.privateSection} />
      </SidebarContent>
    </Sidebar>
  );
};
