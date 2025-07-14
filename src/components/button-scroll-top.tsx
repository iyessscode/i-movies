import { IconChevronsUp } from "@/data/icons";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export const ButtonScrollTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop(400);
  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "bg-primary hover:bg-primary/80 fixed right-6 bottom-6 z-50 size-10 cursor-pointer rounded-full p-2 shadow-lg transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
      aria-label="Scroll to top"
    >
      <IconChevronsUp className="text-foreground size-6" />
    </Button>
  );
};
