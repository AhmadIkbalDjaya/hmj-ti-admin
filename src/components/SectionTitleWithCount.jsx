import { Box, Typography } from "@mui/material";

export default function SectionTitleWithCount({ title = "", total = 0 }) {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
      <Typography fontSize={24} fontWeight={"600"}>
        {title}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight={"600"}
        color={"gray-500"}
        border={1.5}
        borderColor={"gray-500"}
        padding={"0px 5px"}
        borderRadius={10}
      >
        {total}
      </Typography>
    </Box>
  );
}
