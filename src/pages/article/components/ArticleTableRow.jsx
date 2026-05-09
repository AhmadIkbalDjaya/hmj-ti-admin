import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { formatDate } from "../../../helpers/dateHelpers";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";

export default function ArticleTableRow({
  article,
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
          {article.title}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {formatDate(article.publish_at)}
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {article.is_active ? (
            <FaCircleCheck color="green" size={18} />
          ) : (
            <FaCircleXmark color="red" size={18} />
          )}
        </Box>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {article.is_featured ? (
            <FaCircleCheck color="green" size={18} />
          ) : (
            <FaCircleXmark color="red" size={18} />
          )}
        </Box>
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <TableActionShow to={`/articles/${article.id}`} />
          <TableActionEdit to={`/articles/${article.id}/edit`} />
          <TableActionDelete onClick={() => onDeleteData(article.id)} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
