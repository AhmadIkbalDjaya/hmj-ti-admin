import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import { CardSection } from "../../components/CardSection";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { CADRE_STATUS_OPTIONS } from "./components/CadreForm";

const getStatusLabel = (status) =>
  CADRE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;

export default function ShowCadrePage() {
  const { value } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Kader"
        onDelete={value.delete.onOpen}
        itemId={value.cadre?.id}
        editPath={`/cadres/${value.cadre?.id}/edit`}
        loading={value.loading}
      />
      <CardSection title="Data Kader">
        <DetailRow
          label="Nama Kader"
          value={value.cadre?.name}
          loading={value.loading}
        />
        <DetailRow
          label="Angkatan"
          value={value.cadre?.batch}
          loading={value.loading}
        />
        <DetailRow
          label="Status"
          value={getStatusLabel(value.cadre?.status)}
          loading={value.loading}
        />
        <DetailRow
          label="Alamat"
          value={value.cadre?.address ?? "-"}
          loading={value.loading}
        />
      </CardSection>
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
    </>
  );
}
