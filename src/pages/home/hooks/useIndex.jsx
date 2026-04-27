import { useEffect } from "react";
import { useGetSummary } from "../../../hooks/modules/useDashboard";
import { useTitle } from "../../../hooks/useTitle";

export const useIndex = () => {
  useTitle("Dashboard");

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
