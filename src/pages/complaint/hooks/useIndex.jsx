import { useEffect } from "react";
import {
  useGetComplaints,
  useToggleReadComplaint,
} from "../../../hooks/modules/useComplaint";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";
import { useFilters } from "../../../hooks/useFilters";

export const useIndex = () => {
  useTitle("Pesan & Masukan");
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Pengaduan",
      to: "/complaints",
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
    { is_read: null },
    { onFilterChange: resetPage },
  );

  const { complaints, meta, loading, fetchComplaints } = useGetComplaints();
  const fetchComplaintsWithParams = () => {
    fetchComplaints({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
      ...filters,
    });
  };

  useEffect(() => {
    fetchComplaintsWithParams();
  }, [pagination.page, pagination.perpage, search, filters]);

  const selection = useBulkSelection({
    items: complaints,
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

  const deleteProps = useDelete({ onSuccess: fetchComplaintsWithParams });
  const bulkDeleteProps = useBulkDelete({
    onSuccess: () => {
      fetchComplaintsWithParams();
      selection.resetSelection();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteProps.onOpen(selection.getBulkPayload());
  };

  const { toggleReadComplaint } = useToggleReadComplaint();
  const handleToggleRead = (id, isRead) => {
    toggleReadComplaint(id, isRead);
    complaints.forEach((complaint) => {
      if (complaint.id === id) {
        complaint.is_read = isRead;
      }
    });
  };

  return {
    value: {
      breadcrumbItems,
      complaints,
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
      handleToggleRead,
      handleChangeFilter,
    },
  };
};
