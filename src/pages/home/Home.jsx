import { Typography } from "@mui/material";
import BaseLayout from "../../components/base_layout/BaseLayout";

export const Home = () => {
  return (
    <BaseLayout>
      <Typography fontSize={"24px"} fontWeight={"bold"}>
        Dashboard
      </Typography>
    </BaseLayout>
  );
};
