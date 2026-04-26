import { Typography } from "@mui/material";
import { SummaryCards } from "./components/SummaryCards";
import { useIndex } from "./hooks/useIndex";

export const HomePage = () => {
  const { value } = useIndex();

  return (
    <>
      <Typography fontSize={"24px"} fontWeight={"bold"}>
        Dashboard
      </Typography>
      <SummaryCards summary={value.summary} loading={value.loading} />
    </>
  );
};
