import { useState } from "react";
import { useDeleteArticle } from "../../../hooks/modules/useArticle";

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
  const { deleteArticle, loading } = useDeleteArticle({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        id: "",
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deleteArticle(confirmDelete.id);
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
