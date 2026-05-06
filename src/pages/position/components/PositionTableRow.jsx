import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { AppLink } from "../../../components/AppLink";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

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
          <AppLink to={`/positions/${position.id}`}>
            <HiOutlineEye size={22} color="black" />
          </AppLink>
          <AppLink to={`/positions/${position.id}/edit`}>
            <TbEdit size={22} color="black" />
          </AppLink>
          <RiDeleteBin6Line
            size={22}
            onClick={() => onDeleteData(position.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
