import { useState } from "react";
import { useBulkDeleteBusiness } from "../../../hooks/modules/useBusiness";

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

  const { bulkDeleteBusinesses, loading } = useBulkDeleteBusiness({
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
      bulkDeleteBusinesses(confirmDelete.payload);
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
