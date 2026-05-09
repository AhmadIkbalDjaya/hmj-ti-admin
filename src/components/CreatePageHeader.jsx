import { Box, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import FormSubmitButton from "./FormSubmitButton";

export const CreatePageHeader = ({
  title,
  buttonTitle = "Tambah",
  icon = <FaPlus />,
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
