import { useState } from "react";
import { useDeleteBusiness } from "../../../hooks/modules/useBusiness";

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
  const { deleteBusiness, loading } = useDeleteBusiness({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        id: "",
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deleteBusiness(confirmDelete.id);
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
