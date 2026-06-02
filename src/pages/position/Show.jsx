import { Button, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { AppLink } from "../../components/AppLink";
import PositionChildrenTable from "./components/PositionChildrenTable";

const CHILD_CREATE_ACTIONS = {
  1: [{ label: "Tambah Bidang", level: 2 }],
  2: [
    { label: "Tambah Ketua Bidang", level: 3 },
    { label: "Tambah Anggota", level: 4 },
  ],
};

export default function ShowPositionPage() {
  const { value } = useShow();
  const positionLevel = Number(value.position?.level);
  const childCreateActions =
    CHILD_CREATE_ACTIONS[positionLevel] ?? [];
  const childSectionTitle =
    positionLevel === 1
      ? "Bidang"
      : positionLevel === 2
        ? "Turunan Bidang"
        : null;
  const childEmptyMessage =
    positionLevel === 1 ? "Belum ada bidang" : "Belum ada turunan bidang";
  const childCreateButtons = !value.loading && childCreateActions.length > 0 && (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      justifyContent="flex-end"
      my={1}
    >
      {childCreateActions.map((action) => (
        <AppLink
          key={action.level}
          to={`/positions/create?parent_id=${value.position.id}&level=${action.level}`}
          color="inherit"
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<FaPlus />}
            sx={{ textTransform: "none" }}
          >
            {action.label}
          </Button>
        </AppLink>
      ))}
    </Stack>
  );

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
          label="Parent ID"
          value={value.position?.parent_id ?? "-"}
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
      {childSectionTitle && (
        <>
          {childCreateButtons}
          <CardSection title={childSectionTitle} sx={{ mt: 2 }}>
            <PositionChildrenTable
              positions={value.childPositions}
              loading={value.childPositionsLoading}
              emptyMessage={childEmptyMessage}
            />
          </CardSection>
        </>
      )}
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
    </>
  );
}
