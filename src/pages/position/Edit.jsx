import { EditPageHeader } from "../../components/EditPageHeader";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import PositionForm from "./components/PositionForm";
import { useEdit } from "./hooks/useEdit";

export default function EditPositionPage() {
  const { value, func } = useEdit();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <EditPageHeader
        title="Edit Jabatan"
        onClick={func.handleSubmit}
      />
      <PositionForm
        loading={value.loading}
        form={value.form}
        handleChangeForm={func.handleChangeForm}
        errors={value.errors}
      />
    </>
  );
}
