import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = ({ defPage = 1, defPerpage = 10 } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get("page")) || defPage,
    perpage: Number(searchParams.get("perpage")) || defPerpage,
  });

  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (pagination.page != defPage) {
          prev.set("page", pagination.page);
        } else {
          prev.delete("page");
        }

        if (pagination.perpage != defPerpage) {
          prev.set("perpage", pagination.perpage);
        } else {
          prev.delete("perpage");
        }

        return prev;
      },
      { replace: true },
    );
  }, [pagination]);

  const handleChangePerpage = (e) => {
    const perpage = Number(e.target.value);

    if (perpage !== pagination.perpage) {
      setPagination((prev) => ({
        ...prev,
        page: 1,
        perpage,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        perpage,
      }));
    }
  };

  const handleChangePage = (e, value) => {
    setPagination((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const resetPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  return {
    pagination,
    setPagination,
    resetPage,
    handleChangePerpage,
    handleChangePage,
  };
};
