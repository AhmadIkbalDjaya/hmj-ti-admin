import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetComplaint,
  useToggleReadComplaint,
} from "../../../hooks/modules/useComplaint";
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

  const { complaint, loading, getComplaint, setComplaint } = useGetComplaint({
    onSuccess: () => {
      setComplaint((prev) => {
        if (!prev?.is_read) {
          toggleReadComplaint(prev.id, true);
          return {
            ...prev,
            is_read: true,
          };
        }
        return prev;
      });
    },
  });

  useEffect(() => {
    if (!complaintId) return;

    getComplaint(complaintId);
  }, [complaintId]);

  const { toggleReadComplaint } = useToggleReadComplaint({
    notification: false,
  });

  // useEffect(() => {
  //   if (complaint && !complaint.is_read) {
  //     toggleReadComplaint(complaint.id, true);
  //   }
  // }, [complaint?.id]);

  const deleteProps = useDelete({
    onSuccess: () => {
      navigate("/complaints");
    },
  });

  const handleToggleRead = () => {
    toggleReadComplaint(complaint.id, !complaint.is_read, {
      notification: true,
    });
    complaint.is_read = !complaint.is_read;
  };

  return {
    value: {
      complaint,
      loading,
      breadcrumbItems,
      delete: deleteProps,
    },
    func: { handleToggleRead },
  };
};
