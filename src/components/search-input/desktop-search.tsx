"use client";

import { IconSearch, IconX } from "@/data/icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  query: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleSearch: () => void;
  showResults: boolean;
  searchInputRef: React.RefObject<HTMLInputElement>;
  clearSearchInputRef: React.RefObject<HTMLButtonElement>;
  searchButtonRef: React.RefObject<HTMLButtonElement>;
  desktopSearchInputRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const DesktopSearch = ({
  query,
  handleInputChange,
  handleClear,
  handleSearch,
  showResults,
  searchInputRef,
  clearSearchInputRef,
  searchButtonRef,
  desktopSearchInputRef,
  children,
}: Props) => {
  return (
    <div
      ref={desktopSearchInputRef}
      className="hidden w-full max-w-2xl md:block"
    >
      <div className="relative flex flex-col gap-y-4">
        <div className="w-[32rem]">
          <div className="relative w-full">
            <Input
              placeholder="Search..."
              ref={searchInputRef}
              value={query}
              onChange={handleInputChange}
              className="bg-background pr-16 pl-4"
            />
            <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center justify-center">
              <Button
                ref={clearSearchInputRef}
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className={cn(
                  "border-0 bg-transparent",
                  query.length === 0 && "hidden",
                )}
              >
                <IconX />
              </Button>
              <Button
                ref={searchButtonRef}
                variant="ghost"
                size="icon"
                onClick={handleSearch}
                disabled={query.length === 0}
                className="border-0 bg-transparent"
              >
                <IconSearch />
              </Button>
            </div>
          </div>
        </div>
        {showResults && (
          <div className="absolute top-full right-0 left-0 z-10 mt-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
