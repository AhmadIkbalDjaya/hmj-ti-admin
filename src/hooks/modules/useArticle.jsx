import { useState } from "react";
import {
  getArticles,
  getArticle as getArticleService,
  createArticle as createArticleService,
  updateArticle,
  deleteArticle as deleteArticleService,
  bulkDeleteArticles as bulkDeleteArticlesService,
} from "../../services/articleService";
import { useSnackbar } from "notistack";

export const useGetArticles = () => {
  const { enqueueSnackbar } = useSnackbar();
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
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
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
  const { enqueueSnackbar } = useSnackbar();
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
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return {
    loading,
    article,
    getArticle,
  };
};

export const useCreateArticle = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
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

      const message = result.message ?? "Berita membuat diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal membuat berita";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createArticle };
};

export const useEditArticle = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
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

      const message = result.message ?? "Berita berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit berita";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editArticle };
};

export const useDeleteArticle = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteArticle = async (id) => {
    try {
      setLoading(true);
      const result = await deleteArticleService(id);
      onSuccess?.call();

      const message = result.message ?? "Berita berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus berita";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteArticle,
  };
};

export const useBulkDeleteArticle = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const bulkDeleteArticles = async (payload) => {
    try {
      setLoading(true);
      const result = await bulkDeleteArticlesService(payload);
      onSuccess?.call();

      const message = result.message ?? "Berita berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus berita";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    bulkDeleteArticles,
  };
};
