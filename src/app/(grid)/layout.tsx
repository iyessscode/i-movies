import { AppNavbar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function GridLayout({ children }: RootLayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <AppNavbar collapsible="icon" />
        <div className="flex flex-1">
          <AppSidebar collapsible="icon" />
          <SidebarInset className="min-h-screen">
            <div className="flex flex-1 flex-col px-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
