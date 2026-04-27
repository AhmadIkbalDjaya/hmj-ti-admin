import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetComplaint } from "../../../hooks/modules/useComplaint";
import { useDelete } from "./useDelete";
import { useTitle } from "../../../hooks/useTitle";

export const useShow = () => {
  useTitle("Detail Pengaduan");
  const navigate = useNavigate();
  const { id: complaintId } = useParams();
  const breadcrumbItems = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Pengaduan",
      to: "/complaints",
    },
    {
      name: "Detail Pengaduan",
      to: `/complaints/${complaintId}`,
    },
  ];

  const { complaint, loading, getComplaint } = useGetComplaint();

  useEffect(() => {
    getComplaint(complaintId);
  }, []);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/complaints");
    },
  });

  return {
    value: {
      complaint,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: {},
  };
};
