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
import CadreTableRow from "./CadreTableRow";
import TableSelectionBanner from "../../../components/TableSelectionBanner";

const TABLE_HEADERS = ["No", "Nama Kader", "Angkatan", "Status", "Aksi"];

export default function CadreTable({
  cadres = [],
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
    return <EmptyData message="Tidak ada kader yang ditemukan" />;
  }

  return (
    <>
      <TableSelectionBanner
        selection={{ ...selection, itemsOnPage: cadres.length }}
        pagination={pagination}
        itemName="kader"
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
            <TableSkeleton rows={8} columns={6} />
          ) : (
            <TableBody>
              {cadres.map((cadre, index) => (
                <CadreTableRow
                  key={cadre.id}
                  cadre={cadre}
                  pagination={pagination}
                  index={index}
                  onDeleteData={onDeleteData}
                  isSelected={isRowSelected(cadre.id)}
                  onToggle={() => toggleRow(cadre.id)}
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
