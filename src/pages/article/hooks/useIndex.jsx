import { useEffect } from "react";
import { useGetArticles } from "../../../hooks/modules/useArticle";
import { usePaginationSearch } from "../../../hooks/usePaginationSearch";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

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
  } = usePaginationSearch();

  const { articles, meta, loading, fetchArticles } = useGetArticles();
  const fetchArticlesWithParams = () => {
    fetchArticles({
      page: pagination.page,
      limit: pagination.perpage,
      search: search,
    });
  };

  useEffect(() => {
    fetchArticlesWithParams();
  }, [pagination.page, pagination.perpage, search]);

  const paginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 10,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  const deleteProps = useDelete({ onSuccess: fetchArticlesWithParams });

  return {
    value: {
      breadcrumbItems,
      articles,
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
