import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { useCreate } from "./hooks/useCreate";
import { CreatePageHeader } from "../../components/CreatePageHeader";
import PositionForm from "./components/PositionForm";
import FormSubmitButton from "../../components/FormSubmitButton";

export const CreatePositionPage = () => {
  const { value, func } = useCreate();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <CreatePageHeader
        title="Tambah Jabatan"
        onClick={func.handleSubmit}
        loading={value.loading}
      />
      <PositionForm
        form={value.form}
        handleChangeForm={func.handleChangeForm}
        errors={value.errors}
      />
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
