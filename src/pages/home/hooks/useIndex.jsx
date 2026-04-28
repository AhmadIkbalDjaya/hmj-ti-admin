import { useEffect } from "react";
import { useGetSummary } from "../../../hooks/modules/useDashboard";
import { useTitle } from "../../../hooks/useTitle";
import { useGetComplaints } from "../../../hooks/modules/useComplaint";
import { useGetArticles } from "../../../hooks/modules/useArticle";

export const useIndex = () => {
  useTitle("Dashboard");

  const { summary, loading: loadingSummary, fetchSummary } = useGetSummary();

  const {
    complaints,
    meta,
    loading: loadingComplaints,
    fetchComplaints,
  } = useGetComplaints();

  const {
    articles,
    loading: loadingArticles,
    fetchArticles,
  } = useGetArticles();

  useEffect(() => {
    fetchSummary();
    fetchComplaints({ page: 1, limit: 5 });
    fetchArticles({ page: 1, limit: 4, is_featured: true });
  }, []);

  const complaintPaginationProps = {
    page: meta?.page || 1,
    perpage: meta?.limit || 5,
    total: meta?.total || 0,
    total_page: meta?.total_page || 0,
  };

  return {
    value: {
      summary,
      loadingSummary,
      complaints,
      meta,
      loadingComplaints,
      complaintPagination: complaintPaginationProps,
      articles,
      loadingArticles,
    },
  };
};
