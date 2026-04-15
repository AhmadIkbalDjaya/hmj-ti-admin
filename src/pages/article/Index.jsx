import { Box } from "@mui/material";
import { useIndex } from "./hooks/useIndex";
import { AppLink } from "../../components/AppLink";
import ArticleTable from "./components/ArticleTable";
import TableSearchForm from "../../components/TableSearchForm";
import TableCreateButton from "../../components/TableCreateButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import SectionTitleWithCount from "../../components/SectionTitleWithCount";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export const ArticlePage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <SectionTitleWithCount
        title="Berita & Kegiatan"
        total={value.pagination.total ?? 0}
      />
      <Box display={"flex"} justifyContent={"space-between"} my={1}>
        <AppLink to={"/articles/create"} color="inherit">
          <TableCreateButton text="Berita" />
        </AppLink>
        <TableSearchForm
          placeholder="Cari Berita"
          handleChangeSearch={func.onSearch}
          defaultValue={value.search}
        />
      </Box>
      <ArticleTable
        loading={value.loading}
        articles={value.articles}
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
