import { Box, Tooltip } from "@mui/material";
import { HiOutlineEye } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppLink } from "../AppLink";

export const TableActionShow = ({ to }) => (
  <Tooltip title="Detail" placement="top">
    <Box>
      <AppLink to={to}>
        <HiOutlineEye size={22} color="black" />
      </AppLink>
    </Box>
  </Tooltip>
);

export const TableActionEdit = ({ to }) => (
  <Tooltip title="Edit" placement="top">
    <Box>
      <AppLink to={to}>
        <TbEdit size={22} color="black" />
      </AppLink>
    </Box>
  </Tooltip>
);

export const TableActionDelete = ({ onClick }) => (
  <Tooltip title="Hapus" placement="top">
    <Box>
      <RiDeleteBin6Line
        size={22}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      />
    </Box>
  </Tooltip>
);
