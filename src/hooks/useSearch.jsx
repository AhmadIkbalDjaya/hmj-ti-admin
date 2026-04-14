import { useState } from "react";
import { debounce } from "../utils/debounce";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  });

  return { search, handleSearch };
};
