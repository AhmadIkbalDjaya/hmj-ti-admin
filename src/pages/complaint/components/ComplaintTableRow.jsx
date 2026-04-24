import {
  Box,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import { AppLink } from "../../../components/AppLink";

export default function ComplaintTableRow({
  complaint,
  pagination,
  index,
  onDeleteData,
}) {
  return (
    <TableRow key={index}>
      <TableCell padding="checkbox">
        <Checkbox sx={tableCheckboxStyle} />
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }} align="center">
        {getLineNumber(pagination, index)}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }}>
        <Typography
          sx={{
            fontWeight: "600",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {complaint.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {complaint.email ?? "-"}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }}>
        <Typography
          sx={{
            fontWeight: "500",
            maxWidth: 300,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {complaint.description}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <AppLink to={`/complaints/${complaint.id}`}>
            <HiOutlineEye size={22} color="black" />
          </AppLink>
          <RiDeleteBin6Line
            size={22}
            onClick={() => onDeleteData(complaint.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
