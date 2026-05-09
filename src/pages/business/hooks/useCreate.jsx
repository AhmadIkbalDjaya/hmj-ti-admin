import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBusiness } from "../../../hooks/modules/useBusiness";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";
import { generateSlug } from "../../../helpers/stringHelpers";

export const useCreate = () => {
  useTitle("Tambah Usaha");
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Usaha",
      to: "/businesses",
    },
    {
      name: "Tambah Usaha",
      to: "/businesses/create",
    },
  ];

  const formInitial = {
    title: "",
    slug: "",
    description: "",
    price: "",
    whatsapp: "",
    is_active: 1,
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

  const { loading, errors, createBusiness } = useCreateBusiness({
    onSuccess: () => {
      navigate("/businesses");
    },
  });
  const handleSubmit = () => {
    createBusiness(form);
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
