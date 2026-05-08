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
import BusinessTableRow from "./BusinessTableRow";
import TableSelectionBanner from "../../../components/TableSelectionBanner";

const TABLE_HEADERS = ["No", "Nama Usaha", "Harga", "Status", "Aksi"];

export default function BusinessTable({
  businesses = [],
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
    return <EmptyData message="Tidak ada usaha yang ditemukan" />;
  }

  return (
    <>
      <TableSelectionBanner
        selection={{ ...selection, itemsOnPage: businesses.length }}
        pagination={pagination}
        itemName="usaha"
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
                    (header === "No") | (header === "Status")
                      ? "center"
                      : "left"
                  }
                  sx={tableHeadStyle}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton rows={8} columns={6} />
          ) : (
            <TableBody>
              {businesses.map((business, index) => (
                <BusinessTableRow
                  key={business.id}
                  business={business}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                  isSelected={isRowSelected(business.id)}
                  onToggle={() => toggleRow(business.id)}
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
