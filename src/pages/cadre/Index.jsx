import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import CadreTable from "./components/CadreTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import BulkDeleteButton from "../../components/BulkDeleteButton";
import { CADRE_STATUS_OPTIONS } from "./components/CadreForm";

export const CadrePage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Kader"
        total={value.pagination.total ?? 0}
      />
      <Box
        sx={{
          my: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "min-content 1fr min-content",
          },
          gridTemplateAreas: {
            xs: `"create search" "actions actions"`,
            sm: '"create actions search"',
          },
          rowGap: { xs: 1, sm: 0 },
          columnGap: 1,
        }}
      >
        <Box sx={{ gridArea: "create" }}>
          <TableCreateButton text="Kader" to={"/cadres/create"} />
        </Box>
        <Box
          sx={{
            gridArea: "actions",
            display: "flex",
            justifyContent: { xs: "flex-end", sm: "flex-end" },
            gap: 1,
            flexDirection: { xs: "row-reverse", sm: "row" },
          }}
        >
          <BulkDeleteButton
            selectedCount={value.selection.selectedCount}
            handleConfirmDelete={value.selection.handleBulkDelete}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              id="batch"
              name="batch"
              value={value.batch}
              onChange={func.handleChangeBatch}
              displayEmpty
              defaultValue={null}
            >
              <MenuItem value={null}>Angkatan</MenuItem>
              {["2020", "2021", "2022", "2023", "2024", "2025"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select
              id="status"
              name="status"
              value={value.status}
              onChange={func.handleChangeStatus}
              displayEmpty
              defaultValue={null}
            >
              <MenuItem value={null}>Status</MenuItem>
              {CADRE_STATUS_OPTIONS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ gridArea: "search" }}>
          <TableSearchForm
            placeholder="Cari Nama..."
            handleChangeSearch={func.onSearch}
            defaultValue={value.search}
          />
        </Box>
      </Box>
      <CadreTable
        loading={value.loading}
        cadres={value.cadres}
        pagination={value.pagination}
        handleChangePage={func.handleChangePage}
        handleChangePerpage={func.handleChangePerpage}
        onDeleteData={value.delete.onOpen}
        selection={value.selection}
      />
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
      <ConfirmDeleteModal
        open={value.bulkDelete.open}
        onClose={value.bulkDelete.onClose}
        onDelete={value.bulkDelete.onDelete}
      />
    </>
  );
};
