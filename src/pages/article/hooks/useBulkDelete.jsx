import { useState } from "react";
import { useBulkDeleteArticle } from "../../../hooks/modules/useArticle";

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

  const { bulkDeleteArticles, loading } = useBulkDeleteArticle({
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
      bulkDeleteArticles(confirmDelete.payload);
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
