import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = ({ defPage = 1, defPerpage = 10 } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get("page")) || defPage,
    perpage: Number(searchParams.get("perpage")) || defPerpage,
  });

  useEffect(() => {
    let params = {};
    if (pagination.page != defPage) params["page"] = pagination.page;
    if (pagination.perpage != defPerpage) {
      params["perpage"] = pagination.perpage;
    }

    setSearchParams(params, { replace: true });
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
