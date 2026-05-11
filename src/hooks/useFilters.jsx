import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilters = (initialFilters = {}, { onFilterChange } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from searchParams if available
  const getInitialState = () => {
    const state = { ...initialFilters };
    Object.keys(initialFilters).forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        state[key] = value;
      }
    });
    return state;
  };

  const [filters, setFilters] = useState(getInitialState);

  // Sync searchParams when filters change
  useEffect(() => {
    setSearchParams(
      (prev) => {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== "") {
            prev.set(key, value);
          } else {
            prev.delete(key);
          }
        });
        return prev;
      },
      { replace: true },
    );
  }, [filters, setSearchParams]);

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    const prevValue = filters[name];

    // Normalize empty string or "null" string to null
    const normalizedValue =
      value === "" || value === "null" || value === null ? null : value;

    if (normalizedValue !== prevValue) {
      onFilterChange?.();
    }

    setFilters((prev) => ({ ...prev, [name]: normalizedValue }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange?.();
  };

  return {
    filters,
    setFilters,
    handleChangeFilter,
    resetFilters,
  };
};
