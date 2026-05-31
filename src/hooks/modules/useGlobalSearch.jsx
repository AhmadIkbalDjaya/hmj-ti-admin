import { useEffect, useMemo, useState } from "react";
import { getGlobalSearchResults } from "../../services/globalSearchService";

const EMPTY_RESULTS = {
  query: "",
  total: 0,
  groups: [],
};

export const useGlobalSearch = ({ limit = 5, debounceMs = 350 } = {}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    const controller = new AbortController();

    if (!normalizedQuery) {
      setResults(EMPTY_RESULTS);
      setError("");
      setLoading(false);

      return () => controller.abort();
    }

    setLoading(true);
    setError("");

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await getGlobalSearchResults({
          search: normalizedQuery,
          limit,
          signal: controller.signal,
        });

        setResults(response.data ?? EMPTY_RESULTS);
      } catch (err) {
        if (controller.signal.aborted || err.name === "CanceledError") {
          return;
        }

        setError(err?.message ?? "Gagal mencari data");
        setResults({
          ...EMPTY_RESULTS,
          query: normalizedQuery,
        });
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [debounceMs, limit, normalizedQuery]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
  };
};
