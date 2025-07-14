import { useRouter } from "next/navigation";
import * as React from "react";

import { useDebounce } from "@/hooks/use-debounce";

export const useSearchLogic = () => {
  const router = useRouter();
  const params = new URLSearchParams();

  const [query, setQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [mobileShowResults, setMobileShowResults] = React.useState(false);
  const [desktopShowResults, setDesktopShowResults] = React.useState(false);
  const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(
    query,
    800,
  );

  const searchInputRef = React.useRef<HTMLInputElement>(null!);
  const clearSearchInputRef = React.useRef<HTMLButtonElement>(null!);
  const searchButtonRef = React.useRef<HTMLButtonElement>(null!);
  const resultsRef = React.useRef<HTMLDivElement>(null!);
  const desktopSearchInputRef = React.useRef<HTMLDivElement>(null!);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const shouldShow = e.target.value.length > 0;
    setShowResults(shouldShow);
    setDesktopShowResults(shouldShow);
  };

  const handleSearch = () => {
    params.append("search", query);
    router.push(`/advance-search?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    setShowResults(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return {
    setQuery,
    query,
    debouncedSearch,
    isDebouncing,
    setShowResults,
    showResults,
    mobileShowResults,
    desktopShowResults,
    setMobileShowResults,
    setDesktopShowResults,
    searchInputRef,
    clearSearchInputRef,
    searchButtonRef,
    resultsRef,
    desktopSearchInputRef,
    handleInputChange,
    handleSearch,
    handleClear,
  };
};
