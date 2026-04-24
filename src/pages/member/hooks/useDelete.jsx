import { useState } from "react";
import { useDeleteMember } from "../../../hooks/modules/useMember";

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
  const { deleteMember, loading } = useDeleteMember({
    onSuccess: () => {
      setConfirmDelete({
        open: false,
        id: "",
      });
      onSuccess?.();
    },
  });

  const handleDeleteData = () => {
    deleteMember(confirmDelete.id);
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
