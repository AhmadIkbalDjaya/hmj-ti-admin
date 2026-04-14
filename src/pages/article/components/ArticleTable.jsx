import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  tableCheckboxStyle,
  tableHeadStyle,
} from "../../../styles/tableStyles";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../helpers/dateHelpers";
import EmptyData from "../../../components/EmptyData";
import TablePagination from "../../../components/TablePagination";
import { getLineNumber } from "../../../helpers/tableHelpers.";

export default function ArticleTable({
  articles = [],
  pagination = {},
  handleChangePerpage = () => {},
  handleChangePage = () => {},
  onDeleteData = () => {},
}) {
  if (pagination.total === 0) {
    return <EmptyData message="Tidak ada berita yang ditemukan" />;
  }

  return (
    <>
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
                <Checkbox sx={tableCheckboxStyle}></Checkbox>
              </TableCell>
              <TableCell align="center" sx={tableHeadStyle}>
                No
              </TableCell>
              <TableCell align="left" sx={tableHeadStyle}>
                Judul Berita
              </TableCell>
              <TableCell sx={tableHeadStyle}>Tanggal Publikasi</TableCell>
              <TableCell sx={tableHeadStyle}>Status</TableCell>
              <TableCell sx={tableHeadStyle}>Slider</TableCell>
              <TableCell sx={tableHeadStyle}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article, index) => {
              const lineNumber = getLineNumber(pagination, index);

              return (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox sx={tableCheckboxStyle}></Checkbox>
                  </TableCell>
                  <TableCell
                    sx={{ padding: "0 10px", fontWeight: "500" }}
                    align="center"
                  >
                    {lineNumber}
                  </TableCell>
                  <TableCell sx={{ padding: "0 10px" }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        maxWidth: 300,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {article.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
                    {formatDate(article.publish_at)}
                  </TableCell>
                  <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
                    {article.is_active ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
                    {article.is_featured ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ padding: "0 10px" }} align="center">
                    <Box display={"flex"} alignItems={"center"} columnGap={1}>
                      <HiOutlineEye size={22} />
                      <TbEdit size={22} />
                      <RiDeleteBin6Line
                        size={22}
                        onClick={() => onDeleteData(article.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        pagination={pagination}
        handleChangePerpage={handleChangePerpage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
