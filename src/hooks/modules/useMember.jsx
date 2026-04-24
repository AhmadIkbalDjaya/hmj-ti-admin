import { useState } from "react";
import {
  getMembers,
  getMember as getMemberService,
  createMember as createMemberService,
  updateMember,
  deleteMember as deleteMemberService,
} from "../../services/memberService";
import { useSnackbar } from "notistack";

export const useGetMembers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [members, setMembers] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchMembers = async ({
    page,
    limit,
    search,
    position_id,
  }) => {
    try {
      setLoading(true);
      const result = await getMembers({
        page,
        limit,
        search,
        position_id,
      });
      setMembers(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };

  return {
    members,
    meta,
    loading,
    fetchMembers,
  };
};

export const useGetMember = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState();

  const getMember = async (id) => {
    try {
      setLoading(true);
      const result = await getMemberService(id);
      setMember(result.data);
      setLoading(false);

      return result.data;
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };

  return {
    loading,
    member,
    getMember,
  };
};

export const useCreateMember = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const createMember = async (form) => {
    try {
      setLoading(true);
      const result = await createMemberService({
        name: form.name,
        photo: form.photo,
        position_id: form.position_id,
      });
      onSuccess?.call();

      const message = result.message ?? "Anggota berhasil dibuat";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal membuat anggota";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createMember };
};

export const useEditMember = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const editMember = async (memberId, form) => {
    try {
      setLoading(true);
      const result = await updateMember(memberId, {
        name: form.name,
        photo: form.photo ?? null,
        position_id: form.position_id,
      });
      onSuccess?.call();

      const message = result.message ?? "Anggota berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit anggota";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editMember };
};

export const useDeleteMember = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteMember = async (id) => {
    try {
      setLoading(true);
      const result = await deleteMemberService(id);
      onSuccess?.call();

      const message = result.message ?? "Anggota berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus anggota";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteMember,
  };
};
