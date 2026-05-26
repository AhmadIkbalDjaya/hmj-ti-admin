import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import BusinessTable from "./components/BusinessTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import BulkDeleteButton from "../../components/BulkDeleteButton";
import { BusinessFilterBar } from "./components/ArticleFilterBar";

export const BusinessPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Usaha"
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
          <TableCreateButton text="Usaha" to={"/businesses/create"} />
        </Box>
        <Box
          sx={{
            gridArea: "actions",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            flexDirection: { xs: "row-reverse", sm: "row" },
          }}
        >
          <BulkDeleteButton
            selectedCount={value.selection.selectedCount}
            handleConfirmDelete={value.selection.handleBulkDelete}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          />
          <BusinessFilterBar
            filters={value.filters}
            onChangeFilter={func.handleChangeFilter}
          />
        </Box>
        <Box sx={{ gridArea: "search" }}>
          <TableSearchForm
            placeholder="Cari Usaha"
            handleChangeSearch={func.onSearch}
            defaultValue={value.search}
          />
        </Box>
      </Box>
      <BusinessTable
        loading={value.loading}
        businesses={value.businesses}
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
