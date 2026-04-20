import { Box, FormHelperText } from "@mui/material";
import { EditPageHeader } from "../../components/EditPageHeader";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ArticleForm from "./components/ArticleForm";
import { useEdit } from "./hooks/useEdit";
import { CardSection } from "../../components/CardSection";
import RichTextEditor from "../../components/rich-text-editor/Index";
import FilePondUpload from "../../components/file-pond/Index";
import SkeletonWrapper from "../../components/SkeletonWrapper";

export default function EditArticlePage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Berita & Kegiatan"
        onClick={func.handleSubmit}
      />
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        gap={{ xs: 1, md: 3 }}
        sx={{
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <Box
          flex={{
            xs: "100%",
            md: 8,
          }}
        >
          <ArticleForm
            loading={value.loading}
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            errors={value.errors}
          />
          <CardSection
            title="Content Berita"
            required
            sx={{ marginY: 3 }}
            helperText={value.errors.content}
          >
            <SkeletonWrapper
              loading={value.loading}
              height={32}
              sx={{ borderRadius: "4px" }}
              rows={5}
            >
              <RichTextEditor
                name="content"
                value={value.form.content}
                onChange={func.handleChangeForm}
                errors={value.errors}
              />
            </SkeletonWrapper>
          </CardSection>
        </Box>
        <CardSection title="Gambar Berita" sx={{ flex: "4" }}>
          <SkeletonWrapper
            loading={value.loading}
            variant="rectangular"
            height={160}
            sx={{ borderRadius: "4px" }}
          >
            <FilePondUpload
              name="image"
              maxFileSize="1MB"
              errors={value.errors}
              value={value.form?.image}
              acceptedFileTypes={["image/*"]}
              onChange={func.handleChangeForm}
            />
            <FormHelperText>
              Kosongkan jika tidak ingin mengubah gambar berita
            </FormHelperText>
          </SkeletonWrapper>
        </CardSection>
      </Box>
    </>
  );
}
