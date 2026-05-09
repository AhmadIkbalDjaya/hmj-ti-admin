import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

export default function BulkDeleteButton({
  selectedCount = 0,
  handleConfirmDelete = () => {},
  sx = {},
}) {
  if (selectedCount <= 0) {
    return null;
  }

  return (
    <Button
      variant="contained"
      startIcon={<MdDelete size={20} color="red" />}
      size="small"
      sx={{
        textTransform: "none",
        backgroundColor: "gray-100",
        // mr: "5px",
        boxShadow: "0",
        fontWeight: "bold",
        color: "gray-500",
        border: "1px solid #DFE3E8",
        ...sx,
        "&:hover": {
          backgroundColor: "gray-100",
        },
      }}
      onClick={handleConfirmDelete}
    >
      Hapus {selectedCount}
    </Button>
  );
}
