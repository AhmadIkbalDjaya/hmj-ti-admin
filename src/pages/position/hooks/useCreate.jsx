import { useNavigate } from "react-router-dom";
import { useCreatePosition } from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

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

  const { form, handleChangeForm } = useForm(formInitial);

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
      handleChangeForm,
      handleSubmit,
    },
  };
};
