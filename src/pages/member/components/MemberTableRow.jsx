import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";

const GENDER_LABELS = {
  male: "Laki-laki",
  female: "Perempuan",
};

export default function MemberTableRow({
  member,
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
            maxWidth: 300,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {member.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {GENDER_LABELS[member.gender] ?? "-"}
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {member.position.name}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <TableActionShow to={`/members/${member.id}`} />
          <TableActionEdit to={`/members/${member.id}/edit`} />
          <TableActionDelete onClick={() => onDeleteData(member.id)} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
