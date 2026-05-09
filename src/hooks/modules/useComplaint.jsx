import { useState } from "react";
import {
  getComplaints,
  getComplaint as getComplaintService,
  deleteComplaint as deleteComplaintService,
  bulkDeleteComplaints as bulkDeleteComplaintsService,
  toggleReadComplaint as toggleReadComplaintService,
} from "../../services/complaintService";
import { useSnackbar } from "notistack";

export const useGetComplaints = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [complaints, setComplaints] = useState([]);
  const [meta, setMeta] = useState();
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async ({ page, limit, search }) => {
    try {
      setLoading(true);
      const result = await getComplaints({
        page,
        limit,
        search,
      });
      setComplaints(result.data);
      setMeta(result.meta);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };

  return {
    complaints,
    meta,
    loading,
    fetchComplaints,
  };
};

export const useGetComplaint = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [complaint, setComplaint] = useState();

  const getComplaint = async (id) => {
    try {
      setLoading(true);
      const result = await getComplaintService(id);
      setComplaint(result.data);
      setLoading(false);
      onSuccess?.call();

      return result.data;
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
      setLoading(false);
    }
  };

  return {
    loading,
    complaint,
    getComplaint,
    setComplaint,
  };
};

export const useDeleteComplaint = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const deleteComplaint = async (id) => {
    try {
      setLoading(true);
      const result = await deleteComplaintService(id);
      onSuccess?.call();

      const message = result.message ?? "Pengaduan berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus pengaduan";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteComplaint,
  };
};

export const useBulkDeleteComplaint = ({ onSuccess = () => {} } = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const bulkDeleteComplaints = async (payload) => {
    try {
      setLoading(true);
      const result = await bulkDeleteComplaintsService(payload);
      onSuccess?.call();

      const message = result.message ?? "Pengaduan berhasil dihapus";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = error?.message ?? "Gagal menghapus pengaduan";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    bulkDeleteComplaints,
  };
};

export const useToggleReadComplaint = ({
  onSuccess = () => {},
  notification: defaultNotification = true,
} = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const toggleReadComplaint = async (
    id,
    is_read,
    { notification = defaultNotification } = {},
  ) => {
    try {
      setLoading(true);
      const result = await toggleReadComplaintService(id, { is_read });
      onSuccess?.call();

      const message = result.message ?? "Pengaduan berhasil diupdate";
      if (notification) {
        enqueueSnackbar(message, { variant: "success" });
      }
    } catch (error) {
      const message = error?.message ?? "Gagal mengupdate pengaduan";
      if (notification) {
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    toggleReadComplaint,
  };
};
