import { Box, FormHelperText } from "@mui/material";
import { EditPageHeader } from "../../components/EditPageHeader";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import BusinessForm from "./components/BusinessForm";
import { useEdit } from "./hooks/useEdit";
import { CardSection } from "../../components/CardSection";
import FilePondUpload from "../../components/file-pond/Index";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import FormSubmitButton from "../../components/FormSubmitButton";
import { MdModeEdit } from "react-icons/md";

export default function EditBusinessPage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Usaha"
        onClick={func.handleSubmit}
        loading={value.loadingSubmit}
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
          <BusinessForm
            loading={value.loading}
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            errors={value.errors}
          />
        </Box>
        <CardSection title="Gambar Usaha" sx={{ flex: "4" }}>
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
              Kosongkan jika tidak ingin mengubah gambar usaha
            </FormHelperText>
          </SkeletonWrapper>
        </CardSection>
      </Box>
      <FormSubmitButton
        text="Simpan"
        icon={<MdModeEdit />}
        onClick={func.handleSubmit}
        loading={value.loadingSubmit}
        mobileOnly
        fullWidth
        sx={{ my: 1 }}
      />
    </>
  );
}
