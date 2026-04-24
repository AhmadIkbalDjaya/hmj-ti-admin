import { Box } from "@mui/material";
import { CardSection } from "../../components/CardSection";
import AppBreadcrumbs from "../../components/elements/AppBreadcrumbs";
import ShowPageHeader from "../../components/ShowPageHeader";
import { useShow } from "./hooks/useShow";
import DetailRow from "../../components/DetailRow";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ShowMemberPage() {
  const { value } = useShow();

  return (
    <>
      <AppBreadcrumbs items={value.breadcrumbItems} />
      <ShowPageHeader
        title="Detail Anggota"
        onDelete={value.delete.onOpen}
        itemId={value.member?.id}
        editPath={`/members/${value.member?.id}/edit`}
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
          <CardSection title="Data Anggota">
            <DetailRow
              label="Nama Anggota"
              value={value.member?.name}
              loading={value.loading}
            />
            <DetailRow
              label="Jabatan"
              value={value.member?.position.name}
              loading={value.loading}
            />
          </CardSection>
        </Box>
        <CardSection title="Foto Anggota" sx={{ flex: "4" }}>
          <SkeletonWrapper
            loading={value.loading}
            variant="rectangular"
            height="175px"
          >
            <Box sx={{ backgroundColor: "gray-100", height: "175px" }}>
              {value.member?.photo ? (
                <img
                  src={value.member?.photo}
                  alt={value.member?.name}
                  height={"175px"}
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  color="gray"
                >
                  Tidak ada foto
                </Box>
              )}
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
