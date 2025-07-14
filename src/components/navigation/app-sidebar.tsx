"use client";

import { menuSections } from "@/data/menu-sections";

import { SidebarSection } from "@/components/navigation/sidebar-section";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

type Props = {
  collapsible?: "offcanvas" | "icon" | "none";
};

export const AppSidebar = ({ collapsible = "icon" }: Props) => {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible={collapsible}
    >
      <SidebarContent>
        <SidebarSection items={menuSections.publicSection} />
        <Separator />
        <SidebarSection items={menuSections.privateSection} />
      </SidebarContent>
    </Sidebar>
  );
};
