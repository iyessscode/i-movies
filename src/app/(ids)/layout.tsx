import { AppNavbar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function GridLayout({ children }: RootLayoutProps) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen={false} className="flex flex-col">
        <AppNavbar collapsible="offcanvas" />
        <div className="flex flex-1">
          <AppSidebar collapsible="offcanvas" />
        </div>
        <SidebarInset className="flex min-h-screen flex-col">
          <div className="z-0 flex-1 pb-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
