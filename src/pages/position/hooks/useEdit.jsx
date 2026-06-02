import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPosition,
  useGetPosition,
} from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useEdit = () => {
  useTitle("Edit Jabatan");
  const navigate = useNavigate();
  const { id: positionId } = useParams();

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
      name: "Edit Jabatan",
      to: `/positions/${positionId}/edit`,
    },
  ];

  const { loading, getPosition } = useGetPosition();
  useEffect(() => {
    const fetchPosition = async () => {
      const result = await getPosition(positionId);
      if (result) {
        setForm({
          name: result.name,
          slug: result.slug,
          parent_id: result.parent ? result.parent.id : "",
          level: result.level,
          order_index: result.order_index,
          is_active: result.is_active ? 1 : 0,
        });
      }
    };

    fetchPosition();
  }, [positionId]);

  const { form, handleChangeForm, setForm } = useForm();

  const {
    loading: loadingSubmit,
    errors,
    editPosition,
  } = useEditPosition({
    onSuccess: () => {
      navigate("/positions");
    },
  });
  const handleSubmit = () => {
    editPosition(positionId, {
      ...form,
      parent_id: form.parent_id === "" ? null : form.parent_id,
    });
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
