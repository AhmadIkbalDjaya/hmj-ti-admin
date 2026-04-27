import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMember } from "../../../hooks/modules/useMember";
import { useGetPositions } from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useCreate = () => {
  useTitle("Tambah Anggota");
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Anggota",
      to: "/members",
    },
    {
      name: "Tambah Anggota",
      to: "/members/create",
    },
  ];

  const formInitial = {
    name: "",
    position_id: "",
    photo: null,
  };

  const { form, handleChangeForm } = useForm(formInitial);

  const { positions, fetchPositions } = useGetPositions();
  useEffect(() => {
    fetchPositions({ page: 1, limit: 100 });
  }, []);

  const { loading, errors, createMember } = useCreateMember({
    onSuccess: () => {
      navigate("/members");
    },
  });
  const handleSubmit = () => {
    createMember(form);
  };

  return {
    value: {
      breadcrumbItems,
      form,
      errors,
      loading,
      positions,
    },
    func: {
      handleChangeForm,
      handleSubmit,
    },
  };
};
