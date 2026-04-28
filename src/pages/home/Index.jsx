import { Grid, Typography } from "@mui/material";
import { SummaryCards } from "./components/SummaryCards";
import { RecentComplaints } from "./components/RecentComplaints";
import { FeaturedArticles } from "./components/FeaturedArticles";
import { useIndex } from "./hooks/useIndex";

export const HomePage = () => {
  const { value } = useIndex();

  return (
    <>
      <Typography fontSize={"24px"} fontWeight={"bold"}>
        Dashboard
      </Typography>
      <SummaryCards summary={value.summary} loading={value.loadingSummary} />
      <Grid container columns={6} spacing={3} alignItems={"start"}>
        <Grid item md={4}>
          <RecentComplaints
            loading={value.loadingComplaints}
            complaints={value.complaints}
            pagination={value.complaintPagination}
          />
        </Grid>
        <Grid item md={2}>
          <FeaturedArticles
            articles={value.articles}
            loading={value.loadingArticles}
          />
        </Grid>
      </Grid>
    </>
  );
};
