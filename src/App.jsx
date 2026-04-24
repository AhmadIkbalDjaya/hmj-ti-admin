import { ThemeProvider } from "@mui/material";
import DraweOpenContextProvider from "./context/DrawerOpen";
import { AuthProvider } from "./context/AuthContext";
import { themeColor } from "./theme/ColorTheme";
import AppRoutes from "./routes/Index";
import { BrowserRouter } from "react-router-dom";
import AppSnackbarProvider from "./components/AppSnackbarProvider";

export default function App() {
  return (
    <ThemeProvider theme={themeColor}>
      <AuthProvider>
        <DraweOpenContextProvider>
          <AppSnackbarProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AppSnackbarProvider>
        </DraweOpenContextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

