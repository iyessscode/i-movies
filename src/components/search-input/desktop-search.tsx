"use client";

import { IconSearch, IconX } from "@/data/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
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

export const DesktopSearch = ({
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="hidden w-full max-w-2xl md:block"
    >
      <div className="relative w-[32rem]">
        <Input
          ref={inputRef}
          placeholder="Search movies, TV shows, People..."
          value={query}
          onChange={handleInputChange}
          onFocus={isFocused}
          className="bg-background pr-16 pl-4 placeholder:text-sm placeholder:font-semibold placeholder:tracking-wide placeholder:text-neutral-500 placeholder:italic"
          aria-label="Search"
        />
        <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="hover:text-primary border-0 bg-transparent hover:bg-transparent"
              aria-label="Clear search"
            >
              <IconX />
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
            <IconSearch />
          </Button>
        </div>

        <div
          ref={resultsRef}
          className="absolute top-full right-0 left-0 z-10 mt-2"
        >
          {children}
        </div>
      </div>
    </form>
  );
};
