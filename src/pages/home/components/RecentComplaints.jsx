import { Box, Typography } from "@mui/material";
import ComplaintTable from "../../complaint/components/ComplaintTable";
import { AppLink } from "../../../components/AppLink";

export const RecentComplaints = ({ loading, complaints, pagination }) => {
  return (
    <Box
      sx={{
        background: "white",
        border: ".5px solid",
        borderColor: "slate-300",
        borderRadius: "4px",
        padding: "8px 16px",
        width: "100%",
      }}
    >
      <Typography variant={"body"} sx={{ fontWeight: "600" }}>
        Pesan & Masukan Terbaru
      </Typography>
      <ComplaintTable
        loading={loading}
        complaints={complaints}
        pagination={pagination}
        showPagination={false}
        showCheckbox={false}
        showDeleteAction={false}
      />
      <Box display="flex" alignItems="center" justifyContent="end">
        <AppLink to="/complaints" style={{ color: "black" }}>
          Lihat Semua {`>`}
        </AppLink>
      </Box>
    </Box>
  );
};
