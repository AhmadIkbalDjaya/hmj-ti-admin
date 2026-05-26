import { Box } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { EditPageHeader } from "../../components/EditPageHeader";
import FormSubmitButton from "../../components/FormSubmitButton";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ImageUploadCard from "./components/ImageUploadCard";
import OrganizationProfileForm from "./components/OrganizationProfileForm";
import { useIndex } from "./hooks/useIndex";

export const OrganizationProfilePage = () => {
  const { value, func } = useIndex();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Profil Organisasi"
        onClick={func.handleSubmit}
        loading={value.loadingSubmit}
      />
      <Box
        display="flex"
        alignItems="flex-start"
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
          <OrganizationProfileForm
            loading={value.loading}
            form={value.form}
            handleChangeForm={func.handleChangeForm}
            handleMissionChange={func.handleMissionChange}
            handleAddMission={func.handleAddMission}
            handleRemoveMission={func.handleRemoveMission}
            errors={value.errors}
          />
        </Box>
        <Box
          flex={{
            xs: "100%",
            md: 4,
          }}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <ImageUploadCard
            title="Gambar Utama"
            name="main_image"
            currentImage={value.form.current_main_image}
            value={value.form.main_image}
            errors={value.errors}
            loading={value.loading}
            onChange={func.handleChangeForm}
          />
          <ImageUploadCard
            title="Gambar Sekunder"
            name="secondary_image"
            currentImage={value.form.current_secondary_image}
            value={value.form.secondary_image}
            errors={value.errors}
            loading={value.loading}
            onChange={func.handleChangeForm}
          />
        </Box>
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
};
