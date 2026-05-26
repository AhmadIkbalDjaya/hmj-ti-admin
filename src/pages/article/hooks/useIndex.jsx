import { useEffect } from "react";
import { useGetArticles } from "../../../hooks/modules/useArticle";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useBulkDelete } from "./useBulkDelete";
import { useBulkSelection } from "../../../hooks/useBulkSelection";
import { useTitle } from "../../../hooks/useTitle";
import { useFilters } from "../../../hooks/useFilters";

export const useIndex = () => {
  useTitle("Berita & Kegiatan");

  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Berita & Kegiatan",
      to: "/articles",
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
    { is_active: null, is_featured: null },
    { onFilterChange: resetPage },
  );

  const { articles, meta, loading, fetchArticles } = useGetArticles();
  const fetchArticlesWithParams = () => {
    fetchArticles({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
      ...filters,
    });
  };

  useEffect(() => {
    fetchArticlesWithParams();
  }, [pagination.page, pagination.perpage, search, filters]);

  const selection = useBulkSelection({
    items: articles,
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

  const deleteProps = useDelete({ onSuccess: fetchArticlesWithParams });
  const bulkDeleteProps = useBulkDelete({
    onSuccess: () => {
      fetchArticlesWithParams();
      selection.resetSelection();
    },
  });

  const handleBulkDelete = () => {
    bulkDeleteProps.onOpen(selection.getBulkPayload());
  };

  return {
    value: {
      breadcrumbItems,
      articles,
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
