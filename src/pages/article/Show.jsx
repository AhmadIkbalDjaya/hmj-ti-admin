import { Box } from "@mui/material";
import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import { formatDate } from "../../helpers/dateHelpers";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ShowArticlePage() {
  const { value, func } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Berita"
        onDelete={value.delete.onOpen}
        articleId={value.article?.id}
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
          <CardSection title="Data Berita">
            <DetailRow
              label="Judul"
              value={value.article?.title}
              loading={value.loading}
            />
            <DetailRow
              label="Slug"
              value={value.article?.slug}
              loading={value.loading}
            />
            <DetailRow
              label="Tanggal Publish"
              value={formatDate(value.article?.publish_at, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              loading={value.loading}
            />
            <DetailRow
              label="Status"
              value={value.article?.is_active ? "Aktif" : "Non Aktif"}
              loading={value.loading}
            />
            <DetailRow
              label="Unggulan"
              value={value.article?.is_active ? "Ya" : "Tidak"}
              loading={value.loading}
            />
          </CardSection>
          <CardSection title="Content Berita" sx={{ marginY: 3 }}>
            <SkeletonWrapper loading={value.loading} rows={5}>
              <div
                dangerouslySetInnerHTML={{
                  __html: value.article?.content ?? "",
                }}
              />
            </SkeletonWrapper>
          </CardSection>
        </Box>
        <CardSection title="Gambar Berita" sx={{ flex: "4" }}>
          <SkeletonWrapper
            loading={value.loading}
            variant="rectangular"
            height="175px"
          >
            <Box sx={{ backgroundColor: "gray-100", height: "175px" }}>
              <img
                src={value.article?.image}
                alt={value.article?.title}
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
