import { useState } from "react";
import { getDashboardSummary } from "../../services/dashboardService";
import { useSnackbar } from "notistack";

export const useGetSummary = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const result = await getDashboardSummary();
      setSummary(result.data);
      setLoading(false);
    } catch (error) {
      const message = error?.message ?? "Gagal mengambil data";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return {
    summary,
    loading,
    fetchSummary,
  };
};
