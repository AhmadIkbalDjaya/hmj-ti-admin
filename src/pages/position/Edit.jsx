import { EditPageHeader } from "../../components/EditPageHeader";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import PositionForm from "./components/PositionForm";
import { useEdit } from "./hooks/useEdit";
import FormSubmitButton from "../../components/FormSubmitButton";
import { MdModeEdit } from "react-icons/md";

export default function EditPositionPage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Jabatan"
        onClick={func.handleSubmit}
        loading={value.loadingSubmit}
      />
      <PositionForm
        loading={value.loading}
        form={value.form}
        handleChangeForm={func.handleChangeForm}
        errors={value.errors}
      />
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
