import { useEffect } from "react";
import { useGetMembers } from "../../../hooks/modules/useMember";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
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

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchMembersWithParams });

  return {
    value: {
      breadcrumbItems,
      members,
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
