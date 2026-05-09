import { Box, CssBaseline, Grid } from "@mui/material";
import backgroundImg from "../../assets/background-gedung.png";
import { useLogin } from "./hooks/useLogin";
import LoginSidebar from "./components/LoginSidebar";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const { value, func } = useLogin();

  return (
    <>
      <CssBaseline />
      <Grid
        container
        height={"100vh"}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "-50px center", sm: "center" },
          backgroundRepeat: "no-repeat",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            background: "white",
            borderRadius: "20px",
            width: {
              xs: "100%",
              md: "750px",
            },
          }}
          display={"flex"}
        >
          <LoginSidebar />
          <LoginForm value={value} func={func} />
        </Box>
      </Grid>
    </>
  );
}
