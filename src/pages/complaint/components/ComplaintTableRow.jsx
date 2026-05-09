import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import {
  TableActionDelete,
  TableActionShow,
} from "../../../components/table/TableActions";

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
          <TableActionShow to={`/complaints/${complaint.id}`} />
          {showDeleteAction && (
            <TableActionDelete onClick={() => onDeleteData(complaint.id)} />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
