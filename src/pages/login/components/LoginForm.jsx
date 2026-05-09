import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import logoImg from "../../../assets/logo.png";
import { hasError, getErrorMessage } from "../../../helpers/errorHelpers";

export default function LoginForm({ value, func }) {
  return (
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
      {value.generalError && (
        <Typography
          variant="body2"
          fontWeight={"600"}
          fontSize={"12px"}
          textAlign={"center"}
          color={"red"}
          sx={{ mt: 1 }}
        >
          {value.generalError}
        </Typography>
      )}
      <form onSubmit={func.handleSubmit}>
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
            value={value.formValues.username}
            onChange={func.handleChangeForm}
            placeholder="Username"
            fullWidth
            sx={{
              mb: 2,
            }}
            error={hasError("username", value.errors) ? true : false}
            helperText={getErrorMessage("username", value.errors) ?? ""}
            disabled={value.loading}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            value={value.formValues.password}
            onChange={func.handleChangeForm}
            placeholder="Password"
            fullWidth
            error={hasError("password", value.errors) ? true : false}
            helperText={getErrorMessage("password", value.errors) ?? ""}
            disabled={value.loading}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            disabled={value.loading}
            sx={{
              textTransform: "capitalize",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {value.loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
