import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
export default function App() {
  return <RouterProvider router={routes} />;
}
