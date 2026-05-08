import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import { AppLink } from "../../components/AppLink";
import MemberTable from "./components/MemberTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import BulkDeleteButton from "../../components/BulkDeleteButton";

export const MemberPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Anggota"
        total={value.pagination.total ?? 0}
      />
      <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <AppLink to={"/members/create"} color="inherit">
          <TableCreateButton text="Anggota" />
        </AppLink>
        <Box display={"flex"}>
          <BulkDeleteButton
            selectedCount={value.selection.selectedCount}
            handleConfirmDelete={value.selection.handleBulkDelete}
          />
          <TableSearchForm
            placeholder="Cari Anggota"
            handleChangeSearch={func.onSearch}
            defaultValue={value.search}
          />
        </Box>
      </Box>
      <MemberTable
        loading={value.loading}
        members={value.members}
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
