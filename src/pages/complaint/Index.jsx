import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import ComplaintTable from "./components/ComplaintTable";
import TableSearchForm from "../../components/TableSearchForm";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export const ComplaintPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Pengaduan"
        total={value.pagination.total ?? 0}
      />
      <Box display={"flex"} justifyContent={"flex-end"} my={1}>
        <TableSearchForm
          placeholder="Cari Pengaduan"
          handleChangeSearch={func.onSearch}
          defaultValue={value.search}
        />
      </Box>
      <ComplaintTable
        loading={value.loading}
        complaints={value.complaints}
        pagination={value.pagination}
        handleChangePage={func.handleChangePage}
        handleChangePerpage={func.handleChangePerpage}
        onDeleteData={value.delete.onOpen}
      />
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
    </>
  );
};
