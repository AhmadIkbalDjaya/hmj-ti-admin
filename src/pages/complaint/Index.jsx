import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import ComplaintTable from "./components/ComplaintTable";
import TableSearchForm from "../../components/TableSearchForm";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import BulkDeleteButton from "../../components/BulkDeleteButton";

export const ComplaintPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Pengaduan"
        total={value.pagination.total ?? 0}
      />
      <Box
        sx={{
          my: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr min-content",
          },
          gridTemplateAreas: {
            xs: `"search" "actions"`,
            sm: '"actions search"',
          },
          rowGap: { xs: 1, sm: 0 },
          columnGap: 1,
        }}
      >
        <Box
          sx={{
            gridArea: "actions",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <BulkDeleteButton
            selectedCount={value.selection.selectedCount}
            handleConfirmDelete={value.selection.handleBulkDelete}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
        </Box>
        <Box sx={{ gridArea: "search" }}>
          <TableSearchForm
            placeholder="Cari Pengaduan"
            handleChangeSearch={func.onSearch}
            defaultValue={value.search}
          />
        </Box>
      </Box>
      <ComplaintTable
        loading={value.loading}
        complaints={value.complaints}
        pagination={value.pagination}
        handleChangePage={func.handleChangePage}
        handleChangePerpage={func.handleChangePerpage}
        onDeleteData={value.delete.onOpen}
        selection={value.selection}
        handleToggleRead={func.handleToggleRead}
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
