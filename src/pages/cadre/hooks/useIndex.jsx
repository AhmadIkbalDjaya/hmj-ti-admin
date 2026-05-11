import { useEffect, useState } from "react";
import { useGetCadres } from "../../../hooks/modules/useCadre";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";
import { useSearchParams } from "react-router-dom";

export const useIndex = () => {
  useTitle("Kader");
  const breadcrumbItems = [
    { name: "Dashboard", to: "/" },
    { name: "Kader", to: "/cadres" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    pagination,
    handleChangePage,
    handleChangePerpage,
    search,
    onSearch,
    resetPage,
  } = usePaginationSearch();

  const [status, setStatus] = useState(searchParams.get("status") || null);
  const handleChangeStatus = (e) => {
    const prevStatus = status;
    const value = e.target.value;
    if (value !== prevStatus) {
      resetPage();
    }
    setStatus(value);
  };

  const [batch, setBatch] = useState(searchParams.get("batch") || null);
  const handleChangeBatch = (e) => {
    const prevBatch = batch;
    const value = e.target.value;
    if (value !== prevBatch) {
      resetPage();
    }
    setBatch(value);
  };

  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (status !== null) {
          prev.set("status", status);
        } else {
          prev.delete("status");
        }
        if (batch !== null) {
          prev.set("batch", batch);
        } else {
          prev.delete("batch");
        }
        return prev;
      },
      { replace: true },
    );
  }, [status, batch]);

  const { cadres, meta, loading, fetchCadres } = useGetCadres();
  const fetchCadresWithParams = () => {
    fetchCadres({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
      status: status,
      batch: batch,
    });
  };

  useEffect(() => {
    fetchCadresWithParams();
  }, [pagination.page, pagination.perpage, search, status, batch]);

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
      status,
      batch,
    },
    func: {
      handleChangePage,
      handleChangePerpage,
      onSearch,
      handleChangeStatus,
      handleChangeBatch,
    },
  };
};
