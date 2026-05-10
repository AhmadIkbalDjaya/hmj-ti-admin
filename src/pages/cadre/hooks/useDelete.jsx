import { useState } from "react";
import { useDeleteCadre } from "../../../hooks/modules/useCadre";

export const useDelete = ({ onSuccess = () => {} } = {}) => {
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: "",
  });

  const handleOpenDelete = (id) =>
    setConfirmDelete({ open: true, id });

  const handleCloseDelete = () =>
    setConfirmDelete({ open: false, id: "" });

  const { deleteCadre, loading } = useDeleteCadre({
    onSuccess: () => {
      setConfirmDelete({ open: false, id: "" });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deleteCadre(confirmDelete.id);
    handleCloseDelete();
  };

  return {
    open: confirmDelete.open,
    loading,
    onOpen: handleOpenDelete,
    onClose: handleCloseDelete,
    onDelete: handleDeleteData,
  };
};
