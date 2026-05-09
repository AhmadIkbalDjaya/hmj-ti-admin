import { Box, Grid } from "@mui/material";
import logo2Img from "../../../assets/logo2.png";

export default function LoginSidebar() {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent="center"
      alignItems="center"
      sx={{
        flex: 3,
        p: "50px 40px",
        backgroundColor: "primary.main",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        display: {
          xs: "none",
          md: "inherit",
        },
      }}
    >
      <Box
        component={"img"}
        sx={{
          width: "150px",
        }}
        src={logo2Img}
      />
    </Grid>
  );
}
