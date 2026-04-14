import { AppLink } from "../../components/AppLink";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { Box, Button, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

export const CreateArticlePage = () => {
  return (
    <>
      <AppBreadcrumbs>
        <AppLink to={"/"}>Dashboard</AppLink>
        <AppLink to={"/articles"}>Berita & Kegiatan</AppLink>
        <AppLink to={"/articles/create"} color="black">
          Tambah Berita & Kegiatan
        </AppLink>
      </AppBreadcrumbs>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        my={1}
        alignItems={"center"}
      >
        <Typography fontSize={24} fontWeight={"600"}>
          Tambah Berita & Kegiatan
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          size="small"
          sx={{ background: "primary2", textTransform: "none" }}
        >
          Tambah
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} gap={2}>
        <Box
          flex={"8"}
          sx={{
            background: "white",
            border: ".5px solid",
            borderColor: "slate-300",
            borderRadius: "4px",
          }}
        >
          <Typography
            padding={"10px 15px"}
            fontSize={16}
            fontWeight={700}
            borderBottom={"1px solid"}
            borderColor={"slate-300"}
          >
            Informasi Berita
          </Typography>
          <Box padding={"15px 15px"}>sdasd</Box>
        </Box>
        <Box
          flex={"4"}
          sx={{
            background: "white",
            border: ".5px solid",
            borderColor: "slate-300",
            borderRadius: "4px",
          }}
        >
          <Typography
            padding={"10px 15px"}
            fontSize={16}
            fontWeight={700}
            borderBottom={"1px solid"}
            borderColor={"slate-300"}
          >
            Gambar Berita
          </Typography>
        </Box>
      </Box>
    </>
  );
};
