import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePosition } from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";
import { generateSlug } from "../../../helpers/stringHelpers";

export const useCreate = () => {
  useTitle("Tambah Jabatan");
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Jabatan",
      to: "/positions",
    },
    {
      name: "Tambah Jabatan",
      to: "/positions/create",
    },
  ];

  const formInitial = {
    name: "",
    slug: "",
    parent_id: "",
    level: "",
    order_index: 0,
    is_active: 1,
  };

  const { form, handleChangeForm, setForm } = useForm(formInitial);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleChangeFormWithSlug = (e) => {
    const { name, value } = e.target;
    handleChangeForm(e);
    if (name === "name" && !slugManuallyEdited) {
      setForm((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setSlugManuallyEdited(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const { loading, errors, createPosition } = useCreatePosition({
    onSuccess: () => {
      navigate("/positions");
    },
  });
  const handleSubmit = () => {
    createPosition({
      ...form,
      parent_id: form.parent_id === "" ? null : form.parent_id,
    });
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
