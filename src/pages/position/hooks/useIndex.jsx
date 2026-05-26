import { useEffect } from "react";
import { useGetPositions } from "../../../hooks/modules/usePosition";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
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

  const {
    pagination,
    handleChangePage,
    handleChangePerpage,
    search,
    onSearch,
    resetPage,
  } = usePaginationSearch();

  const { filters, handleChangeFilter } = useFilters(
    { is_active: null },
    { onFilterChange: resetPage },
  );

  const { positions, meta, loading, fetchPositions } = useGetPositions();
  const fetchPositionsWithParams = () => {
    fetchPositions({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
      ...filters,
    });
  };

  useEffect(() => {
    fetchPositionsWithParams();
  }, [pagination.page, pagination.perpage, search, filters]);

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchPositionsWithParams });

  return {
    value: {
      breadcrumbItems,
      positions,
      loading,
      pagination: paginationProps,
      search,
      delete: deleteProps,
      filters,
    },
    func: {
      handleChangePage,
      handleChangePerpage,
      onSearch,
      handleChangeFilter,
    },
  };
};
