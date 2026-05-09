import { Box, InputBase } from "@mui/material";
import { FiSearch } from "react-icons/fi";

export default function TableSearchForm({
  placeholder = "Cari Data ...",
  handleChangeSearch = () => {},
  defaultValue = "",
}) {

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={1}
      sx={{
        backgroundColor: "gray-100",
        width: "200px",
        padding: "0 10px",
        boxSizing: "border-box",
        borderRadius: "3px",
      }}
      border={"1px solid #DFE3E8"}
    >
      <FiSearch color="#637381" />
      <InputBase
        name="search"
        onChange={handleChangeSearch}
        placeholder={placeholder}
        defaultValue={defaultValue}
        sx={{
          flexGrow: 1,
          color: "gray-500",
          fontWeight: "600",
          fontSize: "14px",
          placeholder: {
            color: "gray-500",
            fontWeight: "600",
            fontSize: "14px",
          },
        }}
      />
    </Box>
  );
}
