import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Article } from "./pages/article/Article";
import { Business } from "./pages/business/Business";
import { Member } from "./pages/member/Member";
import { Complaint } from "./pages/complaint/Complaint";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    myprimary: {
      main: "#B20600",
    },
  },
});
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/business",
    element: <Business />,
  },
  {
    path: "/member",
    element: <Member />,
  },
  {
    path: "/complaint",
    element: <Complaint />,
  },
]);
export default function App() {
  return <>
  <ThemeProvider theme={theme}>
    <RouterProvider router={routes} />;
  </ThemeProvider>;
  </>
}
