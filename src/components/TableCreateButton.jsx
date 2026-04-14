import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

export default function TableCreateButton({ text, startIcon = <FaPlus /> }) {
  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      size="small"
      sx={{ background: "primary2", textTransform: "none" }}
    >
      {text}
    </Button>
  );
}
