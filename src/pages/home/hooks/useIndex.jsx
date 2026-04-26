import { useEffect } from "react";
import { useGetSummary } from "../../../hooks/modules/useDashboard";

export const useIndex = () => {
  const { summary, loading, fetchSummary } = useGetSummary();

  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    value: {
      summary,
      loading,
    },
  };
};
