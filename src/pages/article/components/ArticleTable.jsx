import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  tableHeadStyle,
  tableCheckboxStyle,
} from "../../../styles/tableStyles";
import EmptyData from "../../../components/EmptyData";
import TablePagination from "../../../components/TablePagination";
import TableSkeleton from "../../../components/TableSkeleton";
import ArticleTableRow from "./ArticleTableRow";

const TABLE_HEADERS = [
  "No",
  "Judul Berita",
  "Tanggal Publikasi",
  "Status",
  "Unggulan",
  "Aksi",
];

const CENTER_ALIGN_HEADERS = ["No", "Status", "Unggulan"];

export default function ArticleTable({
  articles = [],
  pagination = {},
  loading = false,
  handleChangePerpage = () => {},
  handleChangePage = () => {},
  onDeleteData = () => {},
}) {
  if (!loading && pagination.total === 0) {
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
                <Checkbox sx={tableCheckboxStyle} />
              </TableCell>
              {TABLE_HEADERS.map((header) => (
                <TableCell
                  key={header}
                  align={
                    CENTER_ALIGN_HEADERS.includes(header) ? "center" : "left"
                  }
                  sx={tableHeadStyle}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton rows={8} columns={7} />
          ) : (
            <TableBody>
              {articles.map((article, index) => (
                <ArticleTableRow
                  key={index}
                  article={article}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                />
              ))}
            </TableBody>
          )}
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
