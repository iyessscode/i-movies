"use client";

import { IconChevronLeft, IconSearch, IconX } from "@/data/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  setIsOpenMobile: () => void;
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  query: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: () => void;
  handleClear: () => void;
  resultsRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const MobileSearch = ({
  setIsOpenMobile,
  formRef,
  handleSubmit,
  inputRef,
  query,
  handleInputChange,
  isFocused,
  handleClear,
  resultsRef,
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
            onClick={setIsOpenMobile}
          >
            <IconChevronLeft />
          </Button>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative w-full"
          >
            <Input
              ref={inputRef}
              placeholder="Search movies, TV shows, People..."
              value={query}
              onChange={handleInputChange}
              onFocus={isFocused}
              className="bg-background pr-16 placeholder:text-sm placeholder:font-semibold placeholder:tracking-wide placeholder:text-neutral-500 placeholder:italic"
              aria-label="Search"
            />
            <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center justify-center">
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="hover:text-primary border-0 bg-transparent hover:bg-transparent"
                  aria-label="Clear search"
                >
                  <IconX className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={!query.trim()}
                className="hover:text-primary border-0 bg-transparent hover:bg-transparent"
                aria-label="Submit search"
              >
                <IconSearch className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        <div ref={resultsRef} className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
