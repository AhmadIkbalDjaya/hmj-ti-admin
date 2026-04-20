import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditArticle,
  useGetArticle,
} from "../../../hooks/modules/useArticle";
import { useForm } from "../../../hooks/useForm";

export const useEdit = () => {
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
      name: "Edit Berita & Kegiatan",
      to: `/articles/${articleId}/edit`,
    },
  ];

  const { loading, getArticle } = useGetArticle();
  const fetchArticle = async () => {
    const result = await getArticle(articleId);
    if (result) {
      setForm({
        title: result.title,
        slug: result.slug,
        publish_at: result.publish_at
          ? new Date(result.publish_at).toISOString().split("T")[0]
          : null,
        is_active: result.is_active ? 1 : 0,
        is_featured: result.is_featured ? 1 : 0,
        content: result.content,
        image: null,
      });
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);

  const { form, handleChangeForm, setForm } = useForm();

  const {
    loading: loadingSubmit,
    errors,
    editArticle,
  } = useEditArticle({
    onSuccess: () => {
      navigate("/articles");
    },
  });
  const handleSubmit = () => {
    editArticle(articleId, form);
  };

  return {
    value: {
      breadcrumbItems,
      form,
      loading,
      loadingSubmit,
      errors,
    },
    func: { handleChangeForm, handleSubmit },
  };
};
