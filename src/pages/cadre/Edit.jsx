import { Box } from "@mui/material";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { EditPageHeader } from "../../components/EditPageHeader";
import CadreForm from "./components/CadreForm";
import FormSubmitButton from "../../components/FormSubmitButton";
import { useEdit } from "./hooks/useEdit";
import { MdModeEdit } from "react-icons/md";

export default function EditCadrePage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Kader"
        onClick={func.handleSubmit}
        loading={value.loadingSubmit}
      />
      <Box>
        <CadreForm
          loading={value.loading}
          form={value.form}
          handleChangeForm={func.handleChangeForm}
          errors={value.errors}
        />
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
