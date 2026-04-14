import { useState } from "react";
import {
  getArticles,
  deleteArticle as deleteArticleService,
} from "../../services/articleService";

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(false);

  const fetchArticles = async ({
    page,
    limit,
    search,
    is_active,
    is_featured,
  }) => {
    try {
      const result = await getArticles({
        page,
        limit,
        search,
        is_active,
        is_featured,
      });
      setArticles(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      // show toast error
      setLoading(false);
    }
  };

  return {
    articles,
    meta,
    loading,
    fetchArticles,
  };
};

export const useDeleteArticle = ({ onSuccess = () => {} } = {}) => {
  const [loading, setLoading] = useState(false);

  const deleteArticle = async (id) => {
    try {
      setLoading(true);
      const result = await deleteArticleService(id);
      onSuccess?.call();

      // show toast success
    } catch (error) {
      // show toast error
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteArticle,
  };
};
