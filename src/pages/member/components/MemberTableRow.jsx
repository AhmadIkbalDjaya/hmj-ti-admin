import {
  Box,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import { AppLink } from "../../../components/AppLink";

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
        {member.position.name}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <AppLink to={`/members/${member.id}`}>
            <HiOutlineEye size={22} color="black" />
          </AppLink>
          <AppLink to={`/members/${member.id}/edit`}>
            <TbEdit size={22} color="black" />
          </AppLink>
          <RiDeleteBin6Line
            size={22}
            onClick={() => onDeleteData(member.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
