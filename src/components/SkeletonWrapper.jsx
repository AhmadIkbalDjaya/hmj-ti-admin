import { Grid, Skeleton } from "@mui/material";

export default function SkeletonWrapper({
  children,
  loading = false,
  rows = 1,
  columns = 1,
  ...props
}) {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <Grid container spacing={1} columns={columns}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <Grid item key={index} xs={1}>
          <Skeleton {...props} />
        </Grid>
      ))}
    </Grid>
  );
}
