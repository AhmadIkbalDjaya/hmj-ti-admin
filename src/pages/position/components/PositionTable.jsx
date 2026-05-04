import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableHeadStyle } from "../../../styles/tableStyles";
import EmptyData from "../../../components/EmptyData";
import TablePagination from "../../../components/TablePagination";
import TableSkeleton from "../../../components/TableSkeleton";
import PositionTableRow from "./PositionTableRow";

const TABLE_HEADERS = ["No", "Nama Jabatan", "Level", "Status", "Aksi"];

export default function PositionTable({
  positions = [],
  pagination = {},
  loading = false,
  handleChangePerpage = () => {},
  handleChangePage = () => {},
  onDeleteData = () => {},
}) {
  if (!loading && pagination.total === 0) {
    return <EmptyData message="Tidak ada jabatan yang ditemukan" />;
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
              {positions.map((position, index) => (
                <PositionTableRow
                  key={index}
                  position={position}
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
