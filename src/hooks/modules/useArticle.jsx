import { useState } from "react";
import {
  getArticles,
  getArticle as getArticleService,
  createArticle as createArticleService,
  updateArticle,
  deleteArticle as deleteArticleService,
} from "../../services/articleService";

export const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchArticles = async ({
    page,
    limit,
    search,
    is_active,
    is_featured,
  }) => {
    try {
      setLoading(true);
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

export const useGetArticle = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  const getArticle = async (id) => {
    try {
      setLoading(true);
      const result = await getArticleService(id);
      setArticle(result.data);
      setLoading(false);

      return result.data;
    } catch (error) {
      // show toast error
      setLoading(false);
    }
  };

  return {
    loading,
    article,
    getArticle,
  };
};

export const useCreateArticle = ({ onSuccess = () => {} } = {}) => {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const createArticle = async (form) => {
    try {
      setLoading(true);
      const result = await createArticleService({
        title: form.title,
        slug: form.slug,
        content: form.content,
        publish_at: form.publish_at,
        is_active: form.is_active,
        is_featured: form.is_featured,
        image: form.image,
      });
      onSuccess?.call();

      // show toast success
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        // show toast
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createArticle };
};

export const useEditArticle = ({ onSuccess = () => {} } = {}) => {
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const editArticle = async (articleId, form) => {
    try {
      setLoading(true);
      const result = await updateArticle(articleId, {
        title: form.title,
        slug: form.slug,
        content: form.content,
        publish_at: form.publish_at,
        is_active: form.is_active,
        is_featured: form.is_featured,
        image: form.image ?? null,
      });
      onSuccess?.call();

      // show toast success
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        // show toast
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editArticle };
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
