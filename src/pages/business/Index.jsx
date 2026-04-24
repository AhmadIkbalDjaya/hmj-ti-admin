import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import { AppLink } from "../../components/AppLink";
import BusinessTable from "./components/BusinessTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export const BusinessPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Usaha"
        total={value.pagination.total ?? 0}
      />
      <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <AppLink to={"/businesses/create"} color="inherit">
          <TableCreateButton text="Usaha" />
        </AppLink>
        <TableSearchForm
          placeholder="Cari Usaha"
          handleChangeSearch={func.onSearch}
          defaultValue={value.search}
        />
      </Box>
      <BusinessTable
        loading={value.loading}
        businesses={value.businesses}
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
