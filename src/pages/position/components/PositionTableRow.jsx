import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";

export default function PositionTableRow({
  position,
  pagination,
  index,
  onDeleteData,
}) {
  return (
    <TableRow key={index}>
      <TableCell
        sx={{ padding: "0 10px", fontWeight: "500", height: "42px" }}
        align="center"
      >
        {getLineNumber(pagination, index)}
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
          {position.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {position.level === 0
          ? "Presidium"
          : position.level === 1
            ? "Wakil Ketua"
            : position.level === 2
              ? "Bidang"
              : position.level === 3
                ? "Ketua Bidang"
                : "Anggota"}
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
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <TableActionShow to={`/positions/${position.id}`} />
          <TableActionEdit to={`/positions/${position.id}/edit`} />
          <TableActionDelete onClick={() => onDeleteData(position.id)} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
