import { useEffect } from "react";
import { useGetBusinesses } from "../../../hooks/modules/useBusiness";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";
import { useFilters } from "../../../hooks/useFilters";

export const useIndex = () => {
  useTitle("Ekonomi Kreatif");
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Usaha",
      to: "/businesses",
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

  const { businesses, meta, loading, fetchBusinesses } = useGetBusinesses();
  const fetchBusinessesWithParams = () => {
    fetchBusinesses({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
      ...filters,
    });
  };

  useEffect(() => {
    fetchBusinessesWithParams();
  }, [pagination.page, pagination.perpage, search, filters]);

  const selection = useBulkSelection({
    items: businesses,
    totalRecords: meta?.total || 0,
    filters: {
      search: search,
      ...filters,
    },
  });

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchBusinessesWithParams });
  const bulkDeleteProps = useBulkDelete({
    onSuccess: () => {
      fetchBusinessesWithParams();
      selection.resetSelection();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteProps.onOpen(selection.getBulkPayload());
  };

  return {
    value: {
      breadcrumbItems,
      businesses,
      loading,
      pagination: paginationProps,
      search,
      delete: deleteProps,
      bulkDelete: bulkDeleteProps,
      selection: {
        ...selection,
        handleBulkDelete,
      },
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
