import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ShowPositionPage() {
  const { value } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Jabatan"
        onDelete={value.delete.onOpen}
        itemId={value.position?.id}
        editPath={`/positions/${value.position?.id}/edit`}
        loading={value.loading}
      />
      <CardSection title="Data Jabatan">
        <DetailRow
          label="Nama Jabatan"
          value={value.position?.name}
          loading={value.loading}
        />
        <DetailRow
          label="Slug"
          value={value.position?.slug}
          loading={value.loading}
        />
        <DetailRow
          label="Atasan"
          value={value.position?.parent ? value.position?.parent?.name : "-"}
          loading={value.loading}
        />
        <DetailRow
          label="Level"
          value={
            value.position?.level === 0
              ? "Presidium"
              : value.position?.level === 1
                ? "Wakil Ketua"
                : value.position?.level === 2
                  ? "Bidang"
                  : value.position?.level === 3
                    ? "Ketua Bidang"
                    : "Anggota"
          }
          loading={value.loading}
        />
        <DetailRow
          label="Urutan"
          value={value.position?.order_index}
          loading={value.loading}
        />
        <DetailRow
          label="Status"
          value={value.position?.is_active ? "Aktif" : "Non Aktif"}
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
