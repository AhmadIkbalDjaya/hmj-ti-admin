import { useState } from "react";
import { useDeletePosition } from "../../../hooks/modules/usePosition";

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
  const { deletePosition, loading } = useDeletePosition({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        id: "",
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deletePosition(confirmDelete.id);
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
