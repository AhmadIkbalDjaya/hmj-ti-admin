import { Box, Typography } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import FormSubmitButton from "./FormSubmitButton";

export const EditPageHeader = ({
  title,
  buttonTitle = "Simpan",
  icon = <MdModeEdit />,
  onClick = () => {},
  loading = false,
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
        <FormSubmitButton
          text={buttonTitle}
          icon={icon}
          onClick={onClick}
          loading={loading}
          desktopOnly
        />
      )}
    </Box>
  );
};
