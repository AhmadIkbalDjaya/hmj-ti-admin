import { useState } from "react";
import {
  getCadres,
  getCadre as getCadreService,
  createCadre as createCadreService,
  updateCadre,
  deleteCadre as deleteCadreService,
  bulkDeleteCadres as bulkDeleteCadresService,
} from "../../services/cadreService";
import { useSnackbar } from "notistack";

export const useGetCadres = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [cadres, setCadres] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCadres = async ({ page, limit, search, batch, status }) => {
    try {
      setLoading(true);
      const result = await getCadres({ page, limit, search, batch, status });
      setCadres(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return { cadres, meta, loading, fetchCadres };
};

export const useGetCadre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [cadre, setCadre] = useState();

  const getCadre = async (id) => {
    try {
      setLoading(true);
      const result = await getCadreService(id);
      setCadre(result.data);
      setLoading(false);
      return result.data;
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return { loading, cadre, getCadre };
};

export const useCreateCadre = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const createCadre = async (form) => {
    try {
      setLoading(true);
      const result = await createCadreService({
        name: form.name,
        address: form.address || null,
        batch: form.batch,
        status: form.status,
      });
      onSuccess?.call();
      const message = result.message ?? "Kader berhasil dibuat";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal membuat kader";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createCadre };
};

export const useEditCadre = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const editCadre = async (cadreId, form) => {
    try {
      setLoading(true);
      const result = await updateCadre(cadreId, {
        name: form.name,
        address: form.address || null,
        batch: form.batch,
        status: form.status,
      });
      onSuccess?.call();
      const message = result.message ?? "Kader berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit kader";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editCadre };
};

export const useDeleteCadre = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteCadre = async (id) => {
    try {
      setLoading(true);
      const result = await deleteCadreService(id);
      onSuccess?.call();
      const message = result.message ?? "Kader berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus kader";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteCadre };
};

export const useBulkDeleteCadre = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const bulkDeleteCadres = async (payload) => {
    try {
      setLoading(true);
      const result = await bulkDeleteCadresService(payload);
      onSuccess?.call();
      const message = result.message ?? "Kader berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus kader";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, bulkDeleteCadres };
};
