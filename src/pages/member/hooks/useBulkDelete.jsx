import { useState } from "react";
import { useBulkDeleteMember } from "../../../hooks/modules/useMember";

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

  const { bulkDeleteMembers, loading } = useBulkDeleteMember({
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
      bulkDeleteMembers(confirmDelete.payload);
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
