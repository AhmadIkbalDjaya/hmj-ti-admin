import { useEffect } from "react";
import { useGetCadres } from "../../../hooks/modules/useCadre";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";

export const useIndex = () => {
  useTitle("Kader");
  const breadcrumbItems = [
    { name: "Dashboard", to: "/" },
    { name: "Kader", to: "/cadres" },
  ];

  const {
    pagination,
    handleChangePage,
    handleChangePerpage,
    search,
    onSearch,
  } = usePaginationSearch();

  const { cadres, meta, loading, fetchCadres } = useGetCadres();
  const fetchCadresWithParams = () => {
    fetchCadres({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
    });
  };

  useEffect(() => {
    fetchCadresWithParams();
  }, [pagination.page, pagination.perpage, search]);

  const selection = useBulkSelection({
    items: cadres,
    totalRecords: meta?.total || 0,
    filters: {
      page: pagination.page,
      perpage: pagination.perpage,
      search: search,
    },
  });

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchCadresWithParams });
  const bulkDeleteProps = useBulkDelete({
    onSuccess: () => {
      fetchCadresWithParams();
      selection.resetSelection();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteProps.onOpen(selection.getBulkPayload());
  };

  return {
    value: {
      breadcrumbItems,
      cadres,
      loading,
      pagination: paginationProps,
      search,
      delete: deleteProps,
      bulkDelete: bulkDeleteProps,
      selection: {
        ...selection,
        handleBulkDelete,
      },
    },
    func: {
      handleChangePage,
      handleChangePerpage,
      onSearch,
    },
  };
};
