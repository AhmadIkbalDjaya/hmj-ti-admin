import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";

export const usePaginationSearch = () => {
  const { pagination, resetPage, handleChangePage, handleChangePerpage } =
    usePagination();

  const { search, handleSearch } = useSearch();

  const onSearch = (e) => {
    handleSearch(e);
    if (pagination.page != 1) {
      resetPage();
    }
  };

  return {
    pagination,
    resetPage,
    handleChangePage,
    handleChangePerpage,
    search,
    handleSearch,
    onSearch,
  };
};
