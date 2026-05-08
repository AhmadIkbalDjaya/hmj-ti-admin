import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
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
  showCheckbox = true,
  showDeleteAction = true,
  isSelected = false,
  onToggle = () => {},
}) {
  return (
    <TableRow key={index} selected={isSelected}>
      {showCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            sx={tableCheckboxStyle}
            checked={isSelected}
            onChange={onToggle}
          />
        </TableCell>
      )}
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
          {showDeleteAction && (
            <RiDeleteBin6Line
              size={22}
              onClick={() => onDeleteData(complaint.id)}
              style={{ cursor: "pointer" }}
            />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
