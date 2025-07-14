"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

import { IconChevronRight } from "@/data/icons";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

type Props = {
  items: {
    label: string;
    url: string;
    icon: IconType;
    iconActive: IconType;
    description: string;
    subItems?: {
      label: string;
      url: string;
      description: string;
    }[];
  }[];
};

export const SidebarSection = ({ items }: Props) => {
  const pathname = usePathname();
  const { isMobile, setOpen } = useSidebar();

  const onCloseSidebar = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.subItems ? (
            <Collapsible key={item.url} className="group/collapsible" asChild>
              <SidebarMenuSubItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.description}
                    isActive={pathname.startsWith(item.url)}
                    aria-label={item.description}
                    title={item.description}
                    className="font-medium data-[active=true]:font-semibold"
                  >
                    {pathname.startsWith(item.url) ? (
                      <item.iconActive />
                    ) : (
                      <item.icon />
                    )}
                    <span>{item.label}</span>
                    <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton
                          aria-label={subItem.description}
                          title={subItem.description}
                          onClick={onCloseSidebar}
                          asChild
                        >
                          <Link href={subItem.url} className="relative">
                            <span>{subItem.label}</span>
                            <span
                              className={cn(
                                "bg-accent absolute right-2 hidden size-2 rounded-full",
                                pathname === subItem.url && "block",
                              )}
                            />
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuSubItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                tooltip={item.description}
                isActive={pathname === item.url}
                className="font-medium data-[active=true]:font-semibold"
                aria-label={item.description}
                title={item.description}
                onClick={onCloseSidebar}
                asChild
              >
                <Link href={item.url}>
                  {pathname === item.url ? <item.iconActive /> : <item.icon />}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
