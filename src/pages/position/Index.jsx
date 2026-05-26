import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import { AppLink } from "../../components/AppLink";
import PositionTable from "./components/PositionTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { PositionFilterBar } from "./components/PositionFilterBar";

export const PositionPage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Jabatan"
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
          <TableCreateButton text="Jabatan" to={"/positions/create"} />
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
          <PositionFilterBar
            filters={value.filters}
            onChangeFilter={func.handleChangeFilter}
          />
        </Box>
        <Box sx={{ gridArea: "search" }}>
          <TableSearchForm
            placeholder="Cari Jabatan"
            handleChangeSearch={func.onSearch}
            defaultValue={value.search}
          />
        </Box>
      </Box>
      {/* <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <TableCreateButton text="Jabatan" to={"/positions/create"} />
        <TableSearchForm
          placeholder="Cari Jabatan"
          handleChangeSearch={func.onSearch}
          defaultValue={value.search}
        />
      </Box> */}
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
