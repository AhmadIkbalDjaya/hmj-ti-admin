import { useNavigate } from "react-router-dom";
import { useCreateCadre } from "../../../hooks/modules/useCadre";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useCreate = () => {
  useTitle("Tambah Kader");
  const navigate = useNavigate();
  const breadcrumbItems = [
    { name: "Dashboard", to: "/" },
    { name: "Kader", to: "/cadres" },
    { name: "Tambah Kader", to: "/cadres/create" },
  ];

  const formInitial = {
    name: "",
    address: "",
    batch: "",
    status: "",
  };

  const { form, handleChangeForm } = useForm(formInitial);

  const { loading, errors, createCadre } = useCreateCadre({
    onSuccess: () => {
      navigate("/cadres");
    },
  });

  const handleSubmit = () => {
    createCadre(form);
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
