import { Box, Button, Typography } from "@mui/material";
import { MdModeEdit } from "react-icons/md";

export const EditPageHeader = ({
  title,
  buttonTitle = "Simpan",
  icon = <MdModeEdit />,
  onClick = () => {},
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      my={1}
      alignItems={"center"}
    >
      <Typography variant="h5" fontWeight={"600"}>
        {title}
      </Typography>
      {buttonTitle && (
        <Button
          variant="contained"
          startIcon={icon}
          size="small"
          sx={{
            textTransform: "none",
            display: {
              xs: "none",
              sm: "inherit",
            },
          }}
          onClick={onClick}
        >
          {buttonTitle}
        </Button>
      )}
    </Box>
  );
};
