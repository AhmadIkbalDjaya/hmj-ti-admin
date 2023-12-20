import React from "react";
import BaseLayout from "../../components/base_layout/BaseLayout";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  InputBase,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { RouterLink } from "../../components/RouterLink";
import { MdNavigateNext } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { themePagination } from "../../theme/PaginationTheme";

const tableHeadStyle = {
  fontWeight: "bold",
  padding: "10px 10px",
};

export const Article = () => {
  return (
    <BaseLayout>
      <Breadcrumbs separator={<MdNavigateNext style={{ marginTop: "3px" }} />}>
        <RouterLink to={"/"}>Dashboard</RouterLink>
        <RouterLink to={"/"} color="black">
          Berita & Kegiatan
        </RouterLink>
      </Breadcrumbs>
      <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
        <Typography fontSize={24} fontWeight={"600"}>
          Berita & Kegiatan
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
          125
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          size="small"
          sx={{ background: "primary2", textTransform: "none" }}
        >
          Berita
        </Button>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{
            backgroundColor: "gray-100",
            width: "200px",
            padding: "0 10px",
            boxSizing: "border-box",
            borderRadius: "3px",
          }}
          border={"1px solid #DFE3E8"}
        >
          <FiSearch color="#637381" />
          <InputBase
            placeholder="Cari Berita ..."
            sx={{
              flexGrow: 1,
              color: "gray-500",
              fontWeight: "600",
              fontSize: "12px",
              placeholder: {
                color: "gray-500",
                fontWeight: "600",
                fontSize: "12px",
              },
            }}
          />
        </Box>
      </Box>
      <TableContainer
        sx={{
          margin: "20px 0 10px 0",
          border: "1px solid #C4CDD5",
          borderRadius: "3px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray-100" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{
                    color: "zinc-200",
                    "&.Mui-checked": { color: "primary2" },
                  }}
                ></Checkbox>
              </TableCell>
              <TableCell align="center" sx={tableHeadStyle}>
                No
              </TableCell>
              <TableCell align="left" sx={tableHeadStyle}>
                Judul
              </TableCell>
              <TableCell sx={tableHeadStyle}>Tanggal Publikasi</TableCell>
              <TableCell sx={tableHeadStyle}>Status</TableCell>
              <TableCell sx={tableHeadStyle}>Slider</TableCell>
              <TableCell sx={tableHeadStyle}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{
                    color: "zinc-200",
                    "&.Mui-checked": { color: "primary2" },
                  }}
                ></Checkbox>
              </TableCell>
              <TableCell
                sx={{ padding: "0 10px", fontWeight: "600" }}
                align="center"
              >
                1
              </TableCell>
              <TableCell sx={{ padding: "0 10px", fontWeight: "700" }}>
                Rapat Kerja 2024
              </TableCell>
              <TableCell sx={{ padding: "0 10px", fontWeight: "600" }}>
                24 Mar 2023
              </TableCell>
              <TableCell sx={{ padding: "0 10px", fontWeight: "600" }}>
                Active
              </TableCell>
              <TableCell sx={{ padding: "0 10px", fontWeight: "600" }}>
                True
              </TableCell>
              <TableCell sx={{ padding: "0 10px" }} align="center">
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <HiOutlineEye size={22} />
                  <TbEdit size={22} />
                  <RiDeleteBin6Line size={22} />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={1}>
          <Typography color={"gray-500"} fontWeight={"400"}>
            Tampilkan
          </Typography>
          <FormControl size="small">
            <Select
              value={10}
              style={{ height: "25px" }}
              sx={{ border: "1px solid gray-500" }}
            >
              <MenuItem value={10}>
                <Typography color={"gray-500"} fontSize={"14px"}>
                  10
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
          <Typography color={"gray-500"} fontWeight={"400"}>
            Data
          </Typography>
        </Box>
        <ThemeProvider theme={themePagination}>
          <Pagination count={4} size="small" shape="rounded"></Pagination>
        </ThemeProvider>
      </Box>
    </BaseLayout>
  );
};
