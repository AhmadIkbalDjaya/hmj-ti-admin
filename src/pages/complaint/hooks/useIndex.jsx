import { useEffect } from "react";
import { useGetComplaints } from "../../../hooks/modules/useComplaint";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";

export const useIndex = () => {
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
  } = usePaginationSearch();

  const { complaints, meta, loading, fetchComplaints } = useGetComplaints();
  const fetchComplaintsWithParams = () => {
    fetchComplaints({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
    });
  };

  useEffect(() => {
    fetchComplaintsWithParams();
  }, [pagination.page, pagination.perpage, search]);

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchComplaintsWithParams });

  return {
    value: {
      breadcrumbItems,
      complaints,
      loading,
      pagination: paginationProps,
      search,
      delete: deleteProps,
    },
    func: {
      handleChangePage,
      handleChangePerpage,
      onSearch,
    },
  };
};
