"use client";

import { Suspense, useEffect } from "react";

import { IconSearch } from "@/data/icons";
import { useSearchLogic } from "@/hooks/use-search-logic";

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
    isDebouncing,
    debouncedSearch,
    showResults,
    setShowResults,
    mobileShowResults,
    desktopShowResults,
    setDesktopShowResults,
    setMobileShowResults,
    searchInputRef,
    clearSearchInputRef,
    searchButtonRef,
    resultsRef,
    desktopSearchInputRef,
    handleInputChange,
    handleSearch,
    handleClear,
  } = useSearchLogic();

  useEffect(() => {
    if (mobileShowResults && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileShowResults, searchInputRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const protectedElements = [
        searchInputRef.current,
        clearSearchInputRef.current,
        searchButtonRef.current,
        resultsRef.current,
        document.querySelector(".desktop-results-container"),
      ].filter(Boolean);

      const isOutsideClick =
        (mobileShowResults || desktopShowResults) &&
        protectedElements.every((el) => !el?.contains(target));

      if (isOutsideClick) {
        setMobileShowResults(false);
        setDesktopShowResults(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    clearSearchInputRef,
    resultsRef,
    searchButtonRef,
    searchInputRef,
    setDesktopShowResults,
    setMobileShowResults,
    setShowResults,
    mobileShowResults,
    desktopShowResults,
  ]);

  return (
    <div className="relative">
      <DesktopSearch
        query={query}
        handleInputChange={handleInputChange}
        handleClear={handleClear}
        handleSearch={handleSearch}
        showResults={desktopShowResults}
        searchInputRef={searchInputRef}
        clearSearchInputRef={clearSearchInputRef}
        searchButtonRef={searchButtonRef}
        desktopSearchInputRef={desktopSearchInputRef}
      >
        <Suspense fallback={<SearchResultsSkeleton />}>
          {isDebouncing && query ? (
            <SearchResultsSkeleton />
          ) : (
            showResults && (
              <SearchResults
                resultsRef={resultsRef}
                searchQuery={debouncedSearch}
                handleSearch={handleSearch}
              />
            )
          )}
        </Suspense>
      </DesktopSearch>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileShowResults(true)}
      >
        <IconSearch />
      </Button>

      {mobileShowResults && (
        <MobileSearch
          query={query}
          handleInputChange={handleInputChange}
          handleClear={handleClear}
          handleSearch={handleSearch}
          showResults={showResults}
          setMobileShowResults={setMobileShowResults}
          searchInputRef={searchInputRef}
          clearSearchInputRef={clearSearchInputRef}
          searchButtonRef={searchButtonRef}
        >
          <Suspense fallback={<SearchResultsSkeleton />}>
            {isDebouncing && query ? (
              <SearchResultsSkeleton />
            ) : (
              <SearchResults
                resultsRef={resultsRef}
                searchQuery={debouncedSearch}
                handleSearch={handleSearch}
              />
            )}
          </Suspense>
        </MobileSearch>
      )}
    </div>
  );
};
