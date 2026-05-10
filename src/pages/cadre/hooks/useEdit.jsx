import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCadre,
  useGetCadre,
} from "../../../hooks/modules/useCadre";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useEdit = () => {
  useTitle("Edit Kader");
  const navigate = useNavigate();
  const { id: cadreId } = useParams();

  const breadcrumbItems = [
    { name: "Dashboard", to: "/" },
    { name: "Kader", to: "/cadres" },
    { name: "Edit Kader", to: `/cadres/${cadreId}/edit` },
  ];

  const { form, handleChangeForm, setForm } = useForm();

  const { loading, getCadre } = useGetCadre();
  const fetchCadre = async () => {
    const result = await getCadre(cadreId);
    if (result) {
      setForm({
        name: result.name,
        address: result.address ?? "",
        batch: result.batch,
        status: result.status,
      });
    }
  };

  useEffect(() => {
    fetchCadre();
  }, []);

  const {
    loading: loadingSubmit,
    errors,
    editCadre,
  } = useEditCadre({
    onSuccess: () => {
      navigate("/cadres");
    },
  });

  const handleSubmit = () => {
    editCadre(cadreId, form);
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
