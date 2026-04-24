import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import { useCreate } from "./hooks/useCreate";
import { CreatePageHeader } from "../../components/CreatePageHeader";
import PositionForm from "./components/PositionForm";

export const CreatePositionPage = () => {
  const { value, func } = useCreate();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <CreatePageHeader
        title="Tambah Jabatan"
        onClick={func.handleSubmit}
      />
      <PositionForm
        form={value.form}
        handleChangeForm={func.handleChangeForm}
        errors={value.errors}
      />
    </>
  );
};
