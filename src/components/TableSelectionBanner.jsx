import { Box, Typography } from "@mui/material";

export default function TableSelectionBanner({
  selection = {},
  pagination = {},
  itemName = "data",
}) {
  const {
    isPageSelected,
    isSelectAllRecords,
    activateSelectAll,
    resetSelection,
    selectedCount,
  } = selection;

  const totalRecords = pagination.total || 0;
  const currentPageCount = selection.itemsOnPage || 0;

  if (isSelectAllRecords) {
    return (
      <Box
        sx={{
          backgroundColor: "gray-100",
          p: 1,
          textAlign: "center",
          borderRadius: "4px",
          mb: 1,
        }}
      >
        <Typography variant="body2">
          Semua <strong>{selectedCount}</strong> {itemName} telah dipilih.{" "}
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: "bold", ml: 1 }}
            onClick={resetSelection}
          >
            Batalkan pilihan
          </Typography>
        </Typography>
      </Box>
    );
  }

  if (isPageSelected && totalRecords > currentPageCount) {
    return (
      <Box
        sx={{
          backgroundColor: "gray-100",
          p: 1,
          textAlign: "center",
          borderRadius: "4px",
          mb: 1,
        }}
      >
        <Typography variant="body2">
          Semua <strong>{currentPageCount}</strong> {itemName} di halaman ini
          telah dipilih.{" "}
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: "bold", ml: 1 }}
            onClick={activateSelectAll}
          >
            Pilih semua {totalRecords} {itemName}
          </Typography>
        </Typography>
      </Box>
    );
  }

  return null;
}
