import { Box, Pagination, ThemeProvider } from "@mui/material";
import { themePagination } from "../theme/PaginationTheme";
import { Perpage } from "./Perpage";

export default function TablePagination({
  pagination,
  handleChangePerpage,
  handleChangePage,
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column-reverse", sm: "row" }}
      rowGap={{ xs: 2.5, sm: 0 }}
      justifyContent={"space-between"}
    >
      <Perpage
        value={pagination.perpage}
        handleChangePerpage={handleChangePerpage}
      />
      <ThemeProvider theme={themePagination}>
        <Pagination
          count={pagination.total_page}
          page={pagination.page}
          onChange={handleChangePage}
          size="small"
          shape="rounded"
          sx={{ mx: { xs: "auto", sm: 0 } }}
          siblingCount={2}
        />
      </ThemeProvider>
    </Box>
  );
}
