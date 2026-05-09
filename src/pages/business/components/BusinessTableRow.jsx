import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { getLineNumber } from "../../../helpers/tableHelpers";
import { tableCheckboxStyle } from "../../../styles/tableStyles";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  TableActionDelete,
  TableActionEdit,
  TableActionShow,
} from "../../../components/table/TableActions";

const formatPrice = (price) => {
  if (price == null) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function BusinessTableRow({
  business,
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
          {business.title}
        </Typography>
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        {formatPrice(business.price)}
      </TableCell>
      <TableCell sx={{ padding: "0 10px", fontWeight: "500" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {business.is_active ? (
            <FaCircleCheck color="green" size={18} />
          ) : (
            <FaCircleXmark color="red" size={18} />
          )}
        </Box>
      </TableCell>
      <TableCell sx={{ padding: "0 10px" }} align="center">
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <TableActionShow to={`/businesses/${business.id}`} />
          <TableActionEdit to={`/businesses/${business.id}/edit`} />
          <TableActionDelete onClick={() => onDeleteData(business.id)} />
        </Box>
      </TableCell>
    </TableRow>
  );
}
