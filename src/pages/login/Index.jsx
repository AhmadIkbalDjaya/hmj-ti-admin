import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import logoImg from "../../assets/logo.png";
import logo2Img from "../../assets/logo2.png";
import backgroundImg from "../../assets/background-gedung.png";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import { hasError, getErrorMessage } from "../../helpers/errorHelpers";
import { useTitle } from "../../hooks/useTitle";

export default function LoginPage() {
  useTitle("Login");
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      const result = await login(formValues);
      saveAuth(result.data.token, result.data.user);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }
      setGeneralError(error.message || "Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

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
          backgroundPosition: "center",
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
          <Box
            sx={{
              flex: 3.5,
              py: "70px",
              px: {
                xs: "26px",
                md: "75px",
              },
            }}
          >
            <Box
              component={"img"}
              sx={{
                width: "120px",
                display: "block",
                margin: "0 auto",
              }}
              src={logoImg}
            />
            <Typography
              variant="body1"
              textAlign={{
                xs: "center",
                md: "left",
              }}
              fontWeight={"600"}
              fontSize={20}
            >
              Login to your account
            </Typography>
            {generalError && (
              <Typography
                variant="body2"
                fontWeight={"600"}
                fontSize={"12px"}
                textAlign={"center"}
                color={"red"}
                sx={{ mt: 1 }}
              >
                {generalError}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ py: "40px" }}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChangeForm}
                  placeholder="Username"
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  error={hasError("username", errors) ? true : false}
                  helperText={getErrorMessage("username", errors) ?? ""}
                  disabled={loading}
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChangeForm}
                  placeholder="Password"
                  fullWidth
                  error={hasError("password", errors) ? true : false}
                  helperText={getErrorMessage("password", errors) ?? ""}
                  disabled={loading}
                />
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                  disabled={loading}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
