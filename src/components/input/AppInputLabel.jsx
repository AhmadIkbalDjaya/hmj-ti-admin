import { Box, Typography } from "@mui/material";

export default function AppInputLabel({
  label = "Name",
  required = false,
  ...props
}) {
  return (
    <Box display={"flex"} height={"25px"}>
      <Typography
        variant="body2"
        fontWeight={"600"}
        display={"flex"}
        sx={{ textTransform: "capitalize" }}
        {...props}
      >
        {label}
      </Typography>
      {required ? <Typography color={"red"}>&nbsp; *</Typography> : ""}
    </Box>
  );
}
