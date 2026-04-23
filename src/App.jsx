import { ThemeProvider } from "@mui/material";
import DraweOpenContextProvider from "./context/DrawerOpen";
import { themeColor } from "./theme/ColorTheme";
import AppRoutes from "./routes/Index";
import { BrowserRouter } from "react-router-dom";
import AppSnackbarProvider from "./components/AppSnackbarProvider";

export default function App() {
  return (
    <ThemeProvider theme={themeColor}>
      <DraweOpenContextProvider>
        <AppSnackbarProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppSnackbarProvider>
      </DraweOpenContextProvider>
    </ThemeProvider>
  );
}
