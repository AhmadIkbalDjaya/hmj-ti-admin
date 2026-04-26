import { Box } from "@mui/material";
import { CountCard } from "./CountCard";
import { MdArticle, MdAddBusiness } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";

export const SummaryCards = ({ summary, loading }) => {
  return (
    <Box
      mt={3}
      display={{
        xs: "block",
        md: "flex",
      }}
      columnGap={3}
      rowGap={3}
      justifyContent={"space-between"}
    >
      <CountCard
        loading={loading}
        title="Berita & Kegiatan"
        count={summary?.articles?.total ?? 0}
        icon={<MdArticle size={20} color="#375DFB" />}
        bgIcon="#DBE7FF"
        subTitle="Berita Aktif"
        subTitleCount={summary?.articles?.active ?? 0}
      />
      <CountCard
        loading={loading}
        title="Ekonomi Kreatif"
        count={summary?.businesses?.total ?? 0}
        icon={<MdAddBusiness size={20} color="#E5780B" />}
        bgIcon="#FEECD6"
        subTitle="Ekonomi Kreatif Aktif"
        subTitleCount={summary?.businesses?.active ?? 0}
      />
      <CountCard
        loading={loading}
        title="Anggota"
        count={summary?.members?.total ?? 0}
        icon={<BsFillPeopleFill size={20} color="#1FC16B" />}
        bgIcon="#D4F5E2"
      />
      <CountCard
        loading={loading}
        title="Pesan & Masukan"
        count={summary?.complaints?.total ?? 0}
        icon={<GoReport size={20} color="#E5340B" />}
        bgIcon="#FDDDD6"
      />
    </Box>
  );
};
