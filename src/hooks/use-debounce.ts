import * as React from "react";

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  const [isDebouncing, setIsDebouncing] = React.useState(false);

  React.useEffect(() => {
    setIsDebouncing(true);
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};
