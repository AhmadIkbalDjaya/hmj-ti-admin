import { Box, FormHelperText } from "@mui/material";
import { EditPageHeader } from "../../components/EditPageHeader";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import MemberForm from "./components/MemberForm";
import { useEdit } from "./hooks/useEdit";
import { CardSection } from "../../components/CardSection";
import FilePondUpload from "../../components/file-pond/Index";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import FormSubmitButton from "../../components/FormSubmitButton";
import { MdModeEdit } from "react-icons/md";

export default function EditMemberPage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Anggota"
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
          <MemberForm
            loading={value.loading}
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            errors={value.errors}
            positions={value.positions}
          />
        </Box>
        <CardSection title="Foto Anggota" sx={{ flex: "4" }}>
          <SkeletonWrapper
            loading={value.loading}
            variant="rectangular"
            height={160}
            sx={{ borderRadius: "4px" }}
          >
            <FilePondUpload
              name="photo"
              maxFileSize="1MB"
              errors={value.errors}
              value={value.form?.photo}
              acceptedFileTypes={["image/*"]}
              onChange={func.handleChangeForm}
            />
            <FormHelperText>
              Kosongkan jika tidak ingin mengubah foto anggota
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
