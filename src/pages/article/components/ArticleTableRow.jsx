import {
  Box,
  Checkbox,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../helpers/dateHelpers";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import { AppLink } from "../../../components/AppLink";

export default function ArticleTableRow({
  article,
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
        {article.is_active ? "Active" : "Inactive"}
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {article.is_featured ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <HiOutlineEye size={22} />
          <AppLink to={`/articles/${article.id}/edit`}>
            <TbEdit size={22} color="black" />
          </AppLink>
          <RiDeleteBin6Line
            size={22}
            onClick={() => onDeleteData(article.id)}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
