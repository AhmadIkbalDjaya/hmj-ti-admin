import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import {
  TableActionDelete,
  TableActionShow,
  TableActionToggleRead,
} from "../../../components/table/TableActions";
import { formatDate } from "../../../helpers/dateHelpers";

export default function ComplaintTableRow({
  complaint,
  pagination,
  index,
  onDeleteData,
  showCheckbox = true,
  showDeleteAction = true,
  isSelected = false,
  onToggle = () => {},
  handleToggleRead = () => {},
  showToggleReadAction = true,
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
      {/* <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {complaint.email ?? "-"}
      </TableCell> */}
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
      <TableCell
        sx={{ padding: "0 10px", fontWeight: 500, whiteSpace: "nowrap" }}
      >
        {complaint.created_at ? formatDate(complaint.created_at) : "-"}
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: 500 }}>
        {complaint.is_read ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            columnGap={0.5}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Box
              sx={{
                backgroundColor: "green",
                height: "8px",
                width: "8px",
                borderRadius: 4,
              }}
            ></Box>
            Sudah dibaca
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            columnGap={0.5}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Box
              sx={{
                backgroundColor: "red",
                height: "8px",
                width: "8px",
                borderRadius: 4,
              }}
            ></Box>
            Belum dibaca
          </Box>
        )}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          {showToggleReadAction && (
            <TableActionToggleRead
              isRead={complaint.is_read}
              onClick={() => handleToggleRead(complaint.id, !complaint.is_read)}
            />
          )}
          <TableActionShow to={`/complaints/${complaint.id}`} />
          {showDeleteAction && (
            <TableActionDelete onClick={() => onDeleteData(complaint.id)} />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
