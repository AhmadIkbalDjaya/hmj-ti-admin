import { Button, CircularProgress } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

export default function FormSubmitButton({
  text = "Tambah",
  icon = <FaPlus />,
  onClick,
  loading = false,
  variant = "contained",
  size = "small",
  sx = {},
  mobileOnly = false,
  desktopOnly = false,
  fullWidth = false,
}) {
  const display = mobileOnly
    ? { xs: "flex", sm: "none" }
    : desktopOnly
      ? { xs: "none", sm: "inherit" }
      : "flex";

  return (
    <Button
      variant={variant}
      startIcon={!loading && icon}
      size={size}
      disabled={loading}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        display: display,
        ...sx,
      }}
      onClick={onClick}
    >
      {loading ? (
        <>
          <CircularProgress
            size={16}
            color="inherit"
            style={{ marginRight: "8px" }}
          />
          {text}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
