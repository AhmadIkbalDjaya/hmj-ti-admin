import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditMember,
  useGetMember,
} from "../../../hooks/modules/useMember";
import { useGetPositions } from "../../../hooks/modules/usePosition";
import { useForm } from "../../../hooks/useForm";
import { useTitle } from "../../../hooks/useTitle";

export const useEdit = () => {
  useTitle("Edit Anggota");
  const navigate = useNavigate();
  const { id: memberId } = useParams();

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
      name: "Edit Anggota",
      to: `/members/${memberId}/edit`,
    },
  ];

  const { loading, getMember } = useGetMember();
  const fetchMember = async () => {
    const result = await getMember(memberId);
    if (result) {
      setForm({
        name: result.name,
        position_id: result.position?.id,
        photo: null,
      });
    }
  };
  useEffect(() => {
    fetchMember();
  }, []);

  const { positions, fetchPositions } = useGetPositions();
  useEffect(() => {
    fetchPositions({ page: 1, limit: 100 });
  }, []);

  const { form, handleChangeForm, setForm } = useForm();

  const {
    loading: loadingSubmit,
    errors,
    editMember,
  } = useEditMember({
    onSuccess: () => {
      navigate("/members");
    },
  });
  const handleSubmit = () => {
    editMember(memberId, form);
  };

  return {
    value: {
      breadcrumbItems,
      form,
      loading,
      loadingSubmit,
      errors,
      positions,
    },
    func: { handleChangeForm, handleSubmit },
  };
};
