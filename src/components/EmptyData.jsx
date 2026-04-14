import { Box, Typography } from "@mui/material";
import logoEmpty from "../assets/empty.png";

export default function EmptyData({ message = "Tidak Ada Data", icon }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={5}
    >
      <Box
        component={"img"}
        src={logoEmpty}
        sx={{
          width: "100px",
        }}
      />
      <Typography variant="body2" color="gray-500" fontWeight={600}>
        {message}
      </Typography>
    </Box>
  );
}
