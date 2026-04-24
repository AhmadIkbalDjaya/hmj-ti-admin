import { useState } from "react";
import {
  getBusinesses,
  getBusiness as getBusinessService,
  createBusiness as createBusinessService,
  updateBusiness,
  deleteBusiness as deleteBusinessService,
} from "../../services/businessService";
import { useSnackbar } from "notistack";

export const useGetBusinesses = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [businesses, setBusinesses] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = async ({
    page,
    limit,
    search,
    is_active,
  }) => {
    try {
      setLoading(true);
      const result = await getBusinesses({
        page,
        limit,
        search,
        is_active,
      });
      setBusinesses(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };

  return {
    businesses,
    meta,
    loading,
    fetchBusinesses,
  };
};

export const useGetBusiness = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState();

  const getBusiness = async (id) => {
    try {
      setLoading(true);
      const result = await getBusinessService(id);
      setBusiness(result.data);
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
    business,
    getBusiness,
  };
};

export const useCreateBusiness = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const createBusiness = async (form) => {
    try {
      setLoading(true);
      const result = await createBusinessService({
        title: form.title,
        slug: form.slug,
        description: form.description,
        price: form.price,
        image: form.image,
        whatsapp: form.whatsapp,
        is_active: form.is_active,
      });
      onSuccess?.call();

      const message = result.message ?? "Usaha berhasil dibuat";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal membuat usaha";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, createBusiness };
};

export const useEditBusiness = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);

  const editBusiness = async (businessId, form) => {
    try {
      setLoading(true);
      const result = await updateBusiness(businessId, {
        title: form.title,
        slug: form.slug,
        description: form.description,
        price: form.price,
        image: form.image ?? null,
        whatsapp: form.whatsapp,
        is_active: form.is_active,
      });
      onSuccess?.call();

      const message = result.message ?? "Usaha berhasil diedit";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      setErrors([]);
      if (error?.errors) {
        setErrors(error.errors);
      } else {
        const message = error?.message ?? "Gagal mengedit usaha";
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, editBusiness };
};

export const useDeleteBusiness = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteBusiness = async (id) => {
    try {
      setLoading(true);
      const result = await deleteBusinessService(id);
      onSuccess?.call();

      const message = result.message ?? "Usaha berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus usaha";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteBusiness,
  };
};
