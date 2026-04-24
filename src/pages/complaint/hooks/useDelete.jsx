import { useState } from "react";
import { useDeleteComplaint } from "../../../hooks/modules/useComplaint";

export const useDelete = ({ onSuccess = () => {} } = {}) => {
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: "",
  });

  const handleOpenDelete = (id) =>
    setConfirmDelete({
      open: true,
      id,
    });

  const handleCloseDelete = () => {
    setConfirmDelete({
      open: false,
      id: "",
    });
  };
  const { deleteComplaint, loading } = useDeleteComplaint({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        id: "",
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deleteComplaint(confirmDelete.id);
    handleCloseDelete();
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
