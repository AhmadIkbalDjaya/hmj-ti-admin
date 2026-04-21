import { Grid, Typography } from "@mui/material";
import SkeletonWrapper from "./SkeletonWrapper";

export default function DetailRow({ label, value, loading = false }) {
  return (
    <Grid item container spacing={1} sx={{ marginBottom: 1.5 }}>
      <Grid item xs={5} display={"flex"} justifyContent={"space-between"}>
        <Typography
          variant="body2"
          fontWeight={"500"}
          sx={{ textTransform: "capitalize" }}
        >
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={"500"}>
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <SkeletonWrapper loading={loading}>
          <Typography
            variant="body2"
            fontWeight={"500"}
            sx={{ textTransform: "capitalize" }}
          >
            {value ?? "-"}
          </Typography>
        </SkeletonWrapper>
      </Grid>
    </Grid>
  );
}
