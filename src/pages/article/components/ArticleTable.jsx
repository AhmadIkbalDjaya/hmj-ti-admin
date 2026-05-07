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
import TableSelectionBanner from "../../../components/TableSelectionBanner";

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
  selection = {},
}) {
  const {
    isPageSelected,
    togglePage,
    isRowSelected,
    toggleRow,
    isSelectAllRecords,
    selectedCount,
  } = selection;

  if (!loading && pagination.total === 0) {
    return <EmptyData message="Tidak ada berita yang ditemukan" />;
  }

  return (
    <>
      <TableSelectionBanner
        selection={{ ...selection, itemsOnPage: articles.length }}
        pagination={pagination}
        itemName="berita"
      />

      <TableContainer
        sx={{
          margin: "10px 0 10px 0",
          border: "1px solid #C4CDD5",
          borderRadius: "3px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray-100" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={tableCheckboxStyle}
                  checked={isPageSelected || isSelectAllRecords}
                  indeterminate={
                    selectedCount > 0 && !isPageSelected && !isSelectAllRecords
                  }
                  onChange={togglePage}
                />
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
                  key={article.id}
                  article={article}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                  isSelected={isRowSelected(article.id)}
                  onToggle={() => toggleRow(article.id)}
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
