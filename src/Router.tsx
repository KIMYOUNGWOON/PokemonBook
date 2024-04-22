import { createBrowserRouter } from "react-router-dom";
import Home from "./HomePage/Home";
import Detail from "./DetailPage/Detail";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/pokemon/:id", element: <Detail /> },
    ],
  },
]);

export default router;
