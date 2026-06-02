import { useState } from "react";
import {
  getPositions,
  getPosition as getPositionService,
  createPosition as createPositionService,
  updatePosition,
  deletePosition as deletePositionService,
} from "../../services/positionService";
import { useSnackbar } from "notistack";

export const useGetPositions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [positions, setPositions] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchPositions = async ({
    page,
    limit,
    search,
    is_active,
    level,
    parent_id,
  } = {}) => {
    try {
      setLoading(true);
      const result = await getPositions({
        page,
        limit,
        search,
        is_active,
        level,
        parent_id,
      });
      setPositions(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return {
    positions,
    meta,
    loading,
    fetchPositions,
  };
};

export const useGetPosition = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState();

  const getPosition = async (id) => {
    try {
      setLoading(true);
      const result = await getPositionService(id);
      setPosition(result.data);
      setLoading(false);

      return result.data;
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return {
    loading,
    position,
    getPosition,
  };
};

export const useCreatePosition = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const createPosition = async (form) => {
    try {
      setLoading(true);
      const result = await createPositionService({
        name: form.name,
        slug: form.slug,
        parent_id: form.parent_id,
        level: form.level,
        order_index: form.order_index,
        is_active: form.is_active,
      });
      onSuccess?.call();

      const message = result.message ?? "Jabatan berhasil dibuat";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal membuat jabatan";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createPosition };
};

export const useEditPosition = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const editPosition = async (positionId, form) => {
    try {
      setLoading(true);
      const result = await updatePosition(positionId, {
        name: form.name,
        slug: form.slug,
        parent_id: form.parent_id,
        level: form.level,
        order_index: form.order_index,
        is_active: form.is_active,
      });
      onSuccess?.call();

      const message = result.message ?? "Jabatan berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit jabatan";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editPosition };
};

export const useDeletePosition = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deletePosition = async (id) => {
    try {
      setLoading(true);
      const result = await deletePositionService(id);
      onSuccess?.call();

      const message = result.message ?? "Jabatan berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus jabatan";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deletePosition,
  };
};
