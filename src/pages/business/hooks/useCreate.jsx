import { useNavigate } from "react-router-dom";
import { useCreateBusiness } from "../../../hooks/modules/useBusiness";
import { useForm } from "../../../hooks/useForm";

export const useCreate = () => {
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

  const { form, handleChangeForm } = useForm(formInitial);

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
      handleChangeForm,
      handleSubmit,
    },
  };
};
