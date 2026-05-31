import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetArticle } from "../../../hooks/modules/useArticle";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

export const useShow = () => {
  useTitle("Detail Berita & Kegiatan");
  const navigate = useNavigate();
  const { id: articleId } = useParams();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Berita & Kegiatan",
      to: "/articles",
    },
    {
      name: "Detail Berita",
      to: `/articles/${articleId}`,
    },
  ];

  const { article, loading, getArticle } = useGetArticle();

  useEffect(() => {
    if (!articleId) return;

    getArticle(articleId);
  }, [articleId]);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/articles");
    },
  });

  return {
    value: {
      article,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
