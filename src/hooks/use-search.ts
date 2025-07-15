// src/hooks/use-search.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { debouncedValue: debouncedQuery, isDebouncing } = useDebounce(
    query,
    800,
  );

  const inputRef = useRef<HTMLInputElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);
  const resultsRef = useRef<HTMLDivElement>(null!);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmedQuery = query.trim();

      if (trimmedQuery) {
        router.push(
          `/advance-search?category=multi&search=${encodeURIComponent(trimmedQuery)}`,
        );
        setIsFocused(false);
        setIsOpenMobile(false);
      }
    },
    [query, router],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    // State
    query,
    setQuery,
    isFocused,
    setIsFocused,
    isOpenMobile,
    setIsOpenMobile,
    isDebouncing,
    debouncedQuery,

    // Refs
    inputRef,
    formRef,
    resultsRef,

    // Handlers
    handleSubmit,
    handleClear,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(e.target.value),
  };
};
