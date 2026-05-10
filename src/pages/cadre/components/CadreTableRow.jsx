import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";
import { CADRE_STATUS_OPTIONS } from "./CadreForm";

const getStatusLabel = (status) =>
  CADRE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;

export default function CadreTableRow({
  cadre,
  pagination,
  index,
  onDeleteData,
  isSelected = false,
  onToggle = () => {},
}) {
  return (
    <TableRow key={index} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          sx={tableCheckboxStyle}
          checked={isSelected}
          onChange={onToggle}
        />
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }} align="center">
        {getLineNumber(pagination, index)}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }}>
        <Typography
          sx={{
            fontWeight: "600",
            maxWidth: 250,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {cadre.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {cadre.batch}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }}>
        {getStatusLabel(cadre.status)}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <TableActionShow to={`/cadres/${cadre.id}`} />
          <TableActionEdit to={`/cadres/${cadre.id}/edit`} />
          <TableActionDelete onClick={() => onDeleteData(cadre.id)} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
