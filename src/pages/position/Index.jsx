import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import { AppLink } from "../../components/AppLink";
import PositionTable from "./components/PositionTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export const PositionPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Jabatan"
        total={value.pagination.total ?? 0}
      />
      <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <AppLink to={"/positions/create"} color="inherit">
          <TableCreateButton text="Jabatan" />
        </AppLink>
        <TableSearchForm
          placeholder="Cari Jabatan"
          handleChangeSearch={func.onSearch}
          defaultValue={value.search}
        />
      </Box>
      <PositionTable
        loading={value.loading}
        positions={value.positions}
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
