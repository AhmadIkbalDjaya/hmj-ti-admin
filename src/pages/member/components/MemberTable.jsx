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
import MemberTableRow from "./MemberTableRow";
import TableSelectionBanner from "../../../components/TableSelectionBanner";

const TABLE_HEADERS = ["No", "Nama Anggota", "Jabatan", "Aksi"];

export default function MemberTable({
  members = [],
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
    return <EmptyData message="Tidak ada anggota yang ditemukan" />;
  }

  return (
    <>
      <TableSelectionBanner
        selection={{ ...selection, itemsOnPage: members.length }}
        pagination={pagination}
        itemName="anggota"
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
                  align={header === "No" ? "center" : "left"}
                  sx={tableHeadStyle}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton rows={8} columns={5} />
          ) : (
            <TableBody>
              {members.map((member, index) => (
                <MemberTableRow
                  key={member.id}
                  member={member}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                  isSelected={isRowSelected(member.id)}
                  onToggle={() => toggleRow(member.id)}
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
