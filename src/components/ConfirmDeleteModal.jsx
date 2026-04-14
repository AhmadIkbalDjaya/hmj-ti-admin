import { RiDeleteBinLine } from "react-icons/ri";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function ConfirmDeleteModal({
  open = false,
  onClose = () => {},
  onDelete = () => {},
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: "center", padding: "20px 35px" }}>
        <RiDeleteBinLine size={70} color="red" />
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: "black", fontSize: "12px", fontWeight: "600" }}
        >
          Data Akan Terhapus Permanent, <br /> apakah anda yakin ingin <br />{" "}
          menghapusnya?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "20px",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={onDelete}
          autoFocus
          sx={{
            textTransform: "capitalize",
            borderRadius: "25px",
            fontWeight: "600",
          }}
          fullWidth
        >
          Ya, Hapus
        </Button>
        <Button
          size="small"
          color="error"
          onClick={onClose}
          sx={{
            textTransform: "capitalize",
            borderRadius: "25px",
            fontWeight: "600",
          }}
          fullWidth
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
