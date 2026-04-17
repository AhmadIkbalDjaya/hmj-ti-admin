import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useCreate } from "./hooks/useCreate";
import ArticleForm from "./components/ArticleForm";
import RichTextEditor from "../../components/rich-text-editor/Index";
import FilePondUpload from "../../components/file-pond/Index";

export const CreateArticlePage = () => {
  const { value, func } = useCreate();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        my={1}
        alignItems={"center"}
      >
        <Typography variant="h5" fontWeight={"600"}>
          Tambah Berita & Kegiatan
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          size="small"
          sx={{
            background: "primary2",
            textTransform: "none",
            display: {
              xs: "none",
              sm: "inherit",
            },
          }}
          onClick={func.handleSubmit}
        >
          Tambah
        </Button>
      </Box>
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
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            errors={value.errors}
          />
          <Box
            sx={{
              background: "white",
              border: ".5px solid",
              borderColor: "slate-300",
              borderRadius: "4px",
              marginY: 3,
            }}
          >
            <Box
              sx={{ p: "15px" }}
              borderBottom={"1px solid"}
              borderColor={"slate-300"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="body2" sx={{ fontWeight: "600" }}>
                Content Berita <span style={{ color: "red" }}>*</span>
                <FormHelperText error={value.errors.content} sx={{ mt: 0 }}>
                  {value.errors.content}
                </FormHelperText>
              </Typography>
            </Box>
            <Box padding={"15px"}>
              <RichTextEditor
                name="content"
                value={value.form.content}
                onChange={func.handleChangeForm}
                errors={value.errors}
              />
            </Box>
          </Box>
        </Box>
        <Box
          flex={"4"}
          sx={{
            background: "white",
            border: ".5px solid",
            borderColor: "slate-300",
            borderRadius: "4px",
          }}
        >
          <Typography
            padding={"10px 15px"}
            fontSize={16}
            fontWeight={700}
            borderBottom={"1px solid"}
            borderColor={"slate-300"}
          >
            Gambar Berita <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box padding={"15px"}>
            <FilePondUpload
              name="image"
              maxFileSize="1MB"
              errors={value.errors}
              value={value.form?.image}
              acceptedFileTypes={["image/*"]}
              onChange={func.handleChangeForm}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
