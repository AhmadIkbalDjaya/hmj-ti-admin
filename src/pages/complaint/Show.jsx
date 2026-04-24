import { Box } from "@mui/material";
import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import { formatDate } from "../../helpers/dateHelpers";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ShowComplaintPage() {
  const { value, func } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Pengaduan"
        onDelete={value.delete.onOpen}
        itemId={value.complaint?.id}
        loading={value.loading}
      />
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        gap={{ xs: 1, md: 3 }}
        sx={{
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <Box flex={{ xs: "100%", md: 1 }}>
          <CardSection title="Data Pengaduan">
            <DetailRow
              label="Nama"
              value={value.complaint?.name}
              loading={value.loading}
            />
            <DetailRow
              label="Email"
              value={value.complaint?.email}
              loading={value.loading}
            />
            <DetailRow
              label="Telepon"
              value={value.complaint?.phone}
              loading={value.loading}
            />
            <DetailRow
              label="Instansi"
              value={value.complaint?.institute}
              loading={value.loading}
            />
            <DetailRow
              label="Deskripsi"
              value={value.complaint?.description}
              loading={value.loading}
            />
            <DetailRow
              label="Dibuat"
              value={formatDate(value.complaint?.created_at, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              loading={value.loading}
            />
            <DetailRow
              label="Diperbarui"
              value={formatDate(value.complaint?.updated_at, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              loading={value.loading}
            />
          </CardSection>
        </Box>
      </Box>
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
    </>
  );
}
