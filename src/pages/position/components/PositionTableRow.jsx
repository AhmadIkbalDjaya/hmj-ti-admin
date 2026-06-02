import { Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";

const LEVEL_LABELS = {
  0: "Presidium",
  1: "Wakil Ketua",
  2: "Bidang",
  3: "Ketua Bidang",
};

export default function PositionTableRow({
  position,
  expanded = false,
  onToggleExpanded = () => {},
  onDeleteData,
}) {
  const hasChildren = position.children.length > 0;

  return (
    <TableRow key={position.id}>
      <TableCell sx={{ padding: "0 10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 42,
            pl: `${position.depth * 24}px`,
          }}
        >
          <Box
            sx={{
              width: 24,
              display: "flex",
              justifyContent: "center",
              mr: 0.5,
            }}
          >
            {hasChildren ? (
              <IconButton
                size="small"
                onClick={() => onToggleExpanded(position.id)}
                aria-label={expanded ? "Tutup turunan" : "Buka turunan"}
                sx={{ padding: 0.25 }}
              >
                {expanded ? (
                  <FiChevronDown size={18} />
                ) : (
                  <FiChevronRight size={18} />
                )}
              </IconButton>
            ) : null}
          </Box>
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
        </Box>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {LEVEL_LABELS[position.level] ?? "Anggota"}
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
