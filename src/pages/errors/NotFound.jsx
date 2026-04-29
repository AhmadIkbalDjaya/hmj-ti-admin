import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

export default function NotFoundPage() {
  useTitle("Halaman Tidak Ditemukan");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", md: "10rem" },
          fontWeight: "bold",
          color: "primary.main",
          mb: 0,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          mb: 2,
        }}
      >
        Halaman Tidak Ditemukan
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "gray-600",
          maxWidth: "500px",
          mb: 4,
        }}
      >
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        Silakan kembali ke Dashboard.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          px: 4,
          py: 1,
          borderRadius: "8px",
        }}
      >
        Kembali ke Dashboard
      </Button>
    </Box>
  );
}
