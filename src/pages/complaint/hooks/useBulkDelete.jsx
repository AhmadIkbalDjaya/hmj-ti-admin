import { useState } from "react";
import { useBulkDeleteComplaint } from "../../../hooks/modules/useComplaint";

export const useBulkDelete = ({ onSuccess = () => {} } = {}) => {
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    payload: null,
  });

  const handleOpenDelete = (payload) =>
    setConfirmDelete({
      open: true,
      payload,
    });

  const handleCloseDelete = () => {
    setConfirmDelete({
      open: false,
      payload: null,
    });
  };

  const { bulkDeleteComplaints, loading } = useBulkDeleteComplaint({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        payload: null,
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    if (confirmDelete.payload) {
      bulkDeleteComplaints(confirmDelete.payload);
    }
  };

  const deleteProps = {
    open: confirmDelete.open,
    loading,
    onOpen: handleOpenDelete,
    onClose: handleCloseDelete,
    onDelete: handleDeleteData,
  };

  return deleteProps;
};
