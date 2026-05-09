import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { Box } from "@mui/material";
import { useCreate } from "./hooks/useCreate";
import { CardSection } from "../../components/CardSection";
import { CreatePageHeader } from "../../components/CreatePageHeader";
import MemberForm from "./components/MemberForm";
import FilePondUpload from "../../components/file-pond/Index";
import FormSubmitButton from "../../components/FormSubmitButton";

export const CreateMemberPage = () => {
  const { value, func } = useCreate();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <CreatePageHeader
        title="Tambah Anggota"
        onClick={func.handleSubmit}
        loading={value.loading}
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
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            errors={value.errors}
            positions={value.positions}
          />
        </Box>
        <CardSection title="Foto Anggota" sx={{ flex: "4" }}>
          <FilePondUpload
            name="photo"
            maxFileSize="1MB"
            errors={value.errors}
            value={value.form?.photo}
            acceptedFileTypes={["image/*"]}
            onChange={func.handleChangeForm}
          />
        </CardSection>
      </Box>
      <FormSubmitButton
        onClick={func.handleSubmit}
        loading={value.loading}
        mobileOnly
        fullWidth
        sx={{ my: 1 }}
      />
    </>
  );
};
