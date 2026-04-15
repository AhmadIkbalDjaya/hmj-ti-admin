import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";
import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (search !== "") {
          prev.set("search", search);
        } else {
          prev.delete("search");
        }
        return prev;
      },
      { replace: true },
    );
  }, [search]);

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  });

  return { search, handleSearch };
};
