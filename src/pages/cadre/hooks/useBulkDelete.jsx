import { useState } from "react";
import { useBulkDeleteCadre } from "../../../hooks/modules/useCadre";

export const useBulkDelete = ({ onSuccess = () => {} } = {}) => {
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    payload: null,
  });

  const handleOpenDelete = (payload) =>
    setConfirmDelete({ open: true, payload });

  const handleCloseDelete = () =>
    setConfirmDelete({ open: false, payload: null });

  const { bulkDeleteCadres, loading } = useBulkDeleteCadre({
    onSuccess: () => {
      setConfirmDelete({ open: false, payload: null });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    if (confirmDelete.payload) {
      bulkDeleteCadres(confirmDelete.payload);
    }
  };

  return {
    open: confirmDelete.open,
    loading,
    onOpen: handleOpenDelete,
    onClose: handleCloseDelete,
    onDelete: handleDeleteData,
  };
};
