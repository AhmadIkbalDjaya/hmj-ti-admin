import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import TableSkeleton from "../../../components/TableSkeleton";
import {
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";
import { tableHeadStyle } from "../../../styles/tableStyles";
import { getPositionLevelLabel } from "./PositionForm";

const TABLE_HEADERS = ["Nama Jabatan", "Level", "Status", "Aksi"];

const sortPositions = (positions) =>
  [...positions].sort((first, second) => {
    const firstLevel = first.level ?? Number.MAX_SAFE_INTEGER;
    const secondLevel = second.level ?? Number.MAX_SAFE_INTEGER;
    const firstOrder = first.order_index ?? Number.MAX_SAFE_INTEGER;
    const secondOrder = second.order_index ?? Number.MAX_SAFE_INTEGER;

    if (firstLevel !== secondLevel) {
      return firstLevel - secondLevel;
    }

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return first.name.localeCompare(second.name);
  });

export default function PositionChildrenTable({
  positions = [],
  loading = false,
  emptyMessage = "Belum ada turunan jabatan",
}) {
  const sortedPositions = sortPositions(positions);

  if (!loading && sortedPositions.length === 0) {
    return (
      <Typography variant="body2" color="gray-500" fontWeight={600}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <TableContainer
      sx={{
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
                align={header === "Status" || header === "Aksi" ? "center" : "left"}
                sx={tableHeadStyle}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableSkeleton rows={4} columns={4} />
        ) : (
          <TableBody>
            {sortedPositions.map((position) => (
              <TableRow key={position.id}>
                <TableCell sx={{ padding: "0 10px", height: "42px" }}>
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
                    {position.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
                  {getPositionLevelLabel(position.level)}
                </TableCell>
                <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {position.is_active ? (
                      <FaCircleCheck color="green" size={18} />
                    ) : (
                      <FaCircleXmark color="red" size={18} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: "0 10px" }} align="center">
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <TableActionShow to={`/positions/${position.id}`} />
                    <TableActionEdit to={`/positions/${position.id}/edit`} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
