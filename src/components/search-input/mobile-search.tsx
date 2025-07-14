"use client";

import { IconChevronLeft, IconSearch, IconX } from "@/data/icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  query: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleSearch: () => void;
  showResults: boolean;
  setMobileShowResults: (show: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  clearSearchInputRef: React.RefObject<HTMLButtonElement>;
  searchButtonRef: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
};

export const MobileSearch = ({
  query,
  handleInputChange,
  handleClear,
  handleSearch,
  showResults,
  setMobileShowResults,
  searchInputRef,
  clearSearchInputRef,
  searchButtonRef,
  children,
}: Props) => {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 z-50 pt-2.5 shadow-md md:hidden">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2.5"
            onClick={() => setMobileShowResults(false)}
          >
            <IconChevronLeft />
          </Button>
          <div className="relative w-full">
            <Input
              placeholder="Search..."
              ref={searchInputRef}
              value={query}
              onChange={handleInputChange}
              className="bg-background pr-16"
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
        {showResults && <div className="w-full">{children}</div>}
      </div>
    </div>
  );
};
