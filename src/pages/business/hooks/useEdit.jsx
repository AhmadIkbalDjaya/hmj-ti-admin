import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBusiness,
  useGetBusiness,
} from "../../../hooks/modules/useBusiness";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useEdit = () => {
  useTitle("Edit Usaha");
  const navigate = useNavigate();
  const { id: businessId } = useParams();

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
      name: "Edit Usaha",
      to: `/businesses/${businessId}/edit`,
    },
  ];

  const { loading, getBusiness } = useGetBusiness();
  useEffect(() => {
    const fetchBusiness = async () => {
      const result = await getBusiness(businessId);
      if (result) {
        setForm({
          title: result.title,
          slug: result.slug,
          description: result.description,
          price: result.price,
          whatsapp: result.whatsapp,
          is_active: result.is_active ? 1 : 0,
          image: null,
        });
      }
    };

    fetchBusiness();
  }, [businessId]);

  const { form, handleChangeForm, setForm } = useForm();

  const {
    loading: loadingSubmit,
    errors,
    editBusiness,
  } = useEditBusiness({
    onSuccess: () => {
      navigate("/businesses");
    },
  });
  const handleSubmit = () => {
    editBusiness(businessId, form);
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
