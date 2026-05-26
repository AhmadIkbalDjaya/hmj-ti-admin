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
import ComplaintTableRow from "./ComplaintTableRow";
import TableSelectionBanner from "../../../components/TableSelectionBanner";

const TABLE_HEADERS = [
  "No",
  "Nama",
  // "Email",
  "Deskripsi",
  "Tanggal",
  "Status",
  "Aksi",
];

export default function ComplaintTable({
  complaints = [],
  pagination = {},
  loading = false,
  handleChangePerpage = () => {},
  handleChangePage = () => {},
  onDeleteData = () => {},
  showCheckbox = true,
  showPagination = true,
  showDeleteAction = true,
  selection = {},
  handleToggleRead = () => {},
  showToggleReadAction = true,
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
    return <EmptyData message="Tidak ada pengaduan yang ditemukan" />;
  }

  return (
    <>
      {showCheckbox && (
        <TableSelectionBanner
          selection={{ ...selection, itemsOnPage: complaints.length }}
          pagination={pagination}
          itemName="pengaduan"
        />
      )}

      <TableContainer
        sx={{
          margin: showCheckbox ? "10px 0 10px 0" : "20px 0 10px 0",
          border: "1px solid #C4CDD5",
          borderRadius: "3px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray-100" }}>
              {showCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={tableCheckboxStyle}
                    checked={isPageSelected || isSelectAllRecords}
                    indeterminate={
                      selectedCount > 0 &&
                      !isPageSelected &&
                      !isSelectAllRecords
                    }
                    onChange={togglePage}
                  />
                </TableCell>
              )}
              {TABLE_HEADERS.map((header) => (
                <TableCell
                  key={header}
                  align={header === "No" ? "center" : "left"}
                  sx={tableHeadStyle}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton rows={8} columns={showCheckbox ? 7 : 6} />
          ) : (
            <TableBody>
              {complaints.map((complaint, index) => (
                <ComplaintTableRow
                  key={complaint.id}
                  complaint={complaint}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                  showCheckbox={showCheckbox}
                  showDeleteAction={showDeleteAction}
                  isSelected={
                    isRowSelected ? isRowSelected(complaint.id) : null
                  }
                  onToggle={() => toggleRow(complaint.id)}
                  handleToggleRead={handleToggleRead}
                  showToggleReadAction={showToggleReadAction}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          pagination={pagination}
          handleChangePerpage={handleChangePerpage}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
}
