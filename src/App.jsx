import { ThemeProvider } from "@mui/material";
import DraweOpenContextProvider from "./context/DrawerOpen";
import { themeColor } from "./theme/ColorTheme";
import AppRoutes from "./routes/Index";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <ThemeProvider theme={themeColor}>
        <DraweOpenContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DraweOpenContextProvider>
      </ThemeProvider>
      ;
    </>
  );
}
