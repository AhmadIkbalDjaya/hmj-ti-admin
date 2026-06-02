import { useEffect } from "react";
import { useGetPositions } from "../../../hooks/modules/usePosition";
import { useSearch } from "../../../hooks/useSearch";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";
import { useFilters } from "../../../hooks/useFilters";

export const useIndex = () => {
  useTitle("Jabatan");
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Jabatan",
      to: "/positions",
    },
  ];

  const { search, handleSearch: onSearch } = useSearch();

  const { filters, handleChangeFilter } = useFilters({ is_active: null });

  const { positions, loading, fetchPositions } = useGetPositions();
  const fetchPositionsWithParams = () => {
    fetchPositions({
      page: 1,
      limit: 1000,
      ...filters,
    });
  };

  useEffect(() => {
    fetchPositionsWithParams();
  }, [filters]);

  const deleteProps = useDelete({ onSuccess: fetchPositionsWithParams });

  return {
    value: {
      breadcrumbItems,
      positions,
      loading,
      totalPositions: positions.length,
      search,
      delete: deleteProps,
      filters,
    },
    func: {
      onSearch,
      handleChangeFilter,
    },
  };
};
