import { Box } from "@mui/material";
import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const formatPrice = (price) => {
  if (price == null) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export default function ShowBusinessPage() {
  const { value, func } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Usaha"
        onDelete={value.delete.onOpen}
        itemId={value.business?.id}
        editPath={`/businesses/${value.business?.id}/edit`}
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
        <Box
          flex={{
            xs: "100%",
            md: 8,
          }}
        >
          <CardSection title="Data Usaha">
            <DetailRow
              label="Nama Usaha"
              value={value.business?.title}
              loading={value.loading}
            />
            <DetailRow
              label="Slug"
              value={value.business?.slug}
              loading={value.loading}
            />
            <DetailRow
              label="Deskripsi"
              value={value.business?.description}
              loading={value.loading}
            />
            <DetailRow
              label="Harga"
              value={formatPrice(value.business?.price)}
              loading={value.loading}
            />
            <DetailRow
              label="WhatsApp"
              value={value.business?.whatsapp}
              loading={value.loading}
            />
            <DetailRow
              label="Status"
              value={value.business?.is_active ? "Aktif" : "Non Aktif"}
              loading={value.loading}
            />
          </CardSection>
        </Box>
        <CardSection title="Gambar Usaha" sx={{ flex: "4" }}>
          <SkeletonWrapper
            loading={value.loading}
            variant="rectangular"
            height="175px"
          >
            <Box sx={{ backgroundColor: "gray-100", height: "175px" }}>
              <img
                src={value.business?.image}
                alt={value.business?.title}
                height={"175px"}
                width="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </SkeletonWrapper>
        </CardSection>
      </Box>
      <ConfirmDeleteModal
        open={value.delete.open}
        onClose={value.delete.onClose}
        onDelete={value.delete.onDelete}
      />
    </>
  );
}
