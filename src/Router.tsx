import { createBrowserRouter } from "react-router-dom";
import Home from "./HomePage/Home";
import Detail from "./DetailPage/Detail";
import Layout from "./Layout";
import MyPokedex from "./MyPage/MyPokedex";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/my-pokedex", element: <MyPokedex /> },
      { path: "/pokemon/:id", element: <Detail /> },
    ],
  },
  { path: "/404", element: <NotFound /> },
]);

export default router;
