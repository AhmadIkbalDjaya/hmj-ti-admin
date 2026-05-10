import { Box } from "@mui/material";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { CreatePageHeader } from "../../components/CreatePageHeader";
import CadreForm from "./components/CadreForm";
import FormSubmitButton from "../../components/FormSubmitButton";
import { useCreate } from "./hooks/useCreate";

export const CreateCadrePage = () => {
  const { value, func } = useCreate();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <CreatePageHeader
        title="Tambah Kader"
        onClick={func.handleSubmit}
        loading={value.loading}
      />
      <Box>
        <CadreForm
          form={value.form}
          handleChangeForm={func.handleChangeForm}
          errors={value.errors}
        />
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
