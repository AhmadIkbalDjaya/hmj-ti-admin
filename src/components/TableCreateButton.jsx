import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { AppLink } from "./AppLink";

export default function TableCreateButton({
  text,
  startIcon = <FaPlus />,
  to,
}) {
  const button = (
    <Button
      variant="contained"
      startIcon={startIcon}
      size="small"
      sx={{ background: "primary2", textTransform: "none" }}
    >
      {text}
    </Button>
  );

  return to ? (
    <AppLink to={to} color="inherit">
      {button}
    </AppLink>
  ) : (
    button
  );
}
