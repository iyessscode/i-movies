"use client";

import { Suspense } from "react";

import { IconSearch } from "@/data/icons";
import { useSearch } from "@/hooks/use-search";

import { DesktopSearch } from "@/components/search-input/desktop-search";
import { MobileSearch } from "@/components/search-input/mobile-search";
import {
  SearchResults,
  SearchResultsSkeleton,
} from "@/components/search-input/search-results";
import { Button } from "@/components/ui/button";

export const SearchInput = () => {
  const {
    query,
    isFocused,
    setIsFocused,
    isOpenMobile,
    setIsOpenMobile,
    isDebouncing,
    debouncedQuery,
    inputRef,
    formRef,
    resultsRef,
    handleSubmit,
    handleClear,
    handleInputChange,
  } = useSearch();

  return (
    <div className="relative">
      <DesktopSearch
        formRef={formRef}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        query={query}
        handleInputChange={handleInputChange}
        isFocused={() => setIsFocused(true)}
        handleClear={handleClear}
        resultsRef={resultsRef}
      >
        <Suspense fallback={<SearchResultsSkeleton />}>
          {isDebouncing && query ? (
            <SearchResultsSkeleton />
          ) : (
            isFocused &&
            query.length !== 0 && (
              <SearchResults
                query={debouncedQuery}
                handleSubmit={handleSubmit}
              />
            )
          )}
        </Suspense>
      </DesktopSearch>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpenMobile(true)}
      >
        <IconSearch />
      </Button>

      {isOpenMobile && (
        <MobileSearch
          setIsOpenMobile={() => setIsOpenMobile(false)}
          formRef={formRef}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          query={query}
          handleInputChange={handleInputChange}
          isFocused={() => setIsFocused(true)}
          handleClear={handleClear}
          resultsRef={resultsRef}
        >
          <Suspense fallback={<SearchResultsSkeleton />}>
            {isDebouncing && query ? (
              <SearchResultsSkeleton />
            ) : (
              isFocused &&
              query.length !== 0 && (
                <SearchResults
                  query={debouncedQuery}
                  handleSubmit={handleSubmit}
                />
              )
            )}
          </Suspense>
        </MobileSearch>
      )}
    </div>
  );
};
