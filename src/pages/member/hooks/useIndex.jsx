import { useEffect } from "react";
import { useGetMembers } from "../../../hooks/modules/useMember";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";

export const useIndex = () => {
  useTitle("Anggota");
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Anggota",
      to: "/members",
    },
  ];

  const {
    pagination,
    handleChangePage,
    handleChangePerpage,
    search,
    onSearch,
  } = usePaginationSearch();

  const { members, meta, loading, fetchMembers } = useGetMembers();
  const fetchMembersWithParams = () => {
    fetchMembers({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
    });
  };

  useEffect(() => {
    fetchMembersWithParams();
  }, [pagination.page, pagination.perpage, search]);

  const selection = useBulkSelection({
    items: members,
    totalRecords: meta?.total || 0,
    filters: {
      search: search,
    },
  });

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchMembersWithParams });
  const bulkDeleteProps = useBulkDelete({
    onSuccess: () => {
      fetchMembersWithParams();
      selection.resetSelection();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteProps.onOpen(selection.getBulkPayload());
  };

  return {
    value: {
      breadcrumbItems,
      members,
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
