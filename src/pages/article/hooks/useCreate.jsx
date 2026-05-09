import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateArticle } from "../../../hooks/modules/useArticle";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";
import { generateSlug } from "../../../helpers/stringHelpers";

export const useCreate = () => {
  useTitle("Tambah Berita & Kegiatan");

  const navigate = useNavigate();
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
      name: "Tambah Berita & Kegiatan",
      to: "/articles/create",
    },
  ];

  const formInitial = {
    title: "",
    slug: "",
    publish_at: null,
    is_active: 1,
    is_featured: 0,
    content: "",
    image: null,
  };

  const { form, handleChangeForm, setForm } = useForm(formInitial);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleChangeFormWithSlug = (e) => {
    const { name, value } = e.target;
    handleChangeForm(e);
    if (name === "title" && !slugManuallyEdited) {
      setForm((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setSlugManuallyEdited(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const { loading, errors, createArticle } = useCreateArticle({
    onSuccess: () => {
      navigate("/articles");
    },
  });
  const handleSubmit = () => {
    createArticle(form);
  };

  return {
    value: {
      breadcrumbItems,
      form,
      errors,
      loading,
    },
    func: {
      handleChangeForm: handleChangeFormWithSlug,
      handleSlugChange,
      handleSubmit,
    },
  };
};
