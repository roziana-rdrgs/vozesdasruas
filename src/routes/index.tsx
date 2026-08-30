import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { About, Home, PostDetail, Posts } from "../pages";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sobre",
        element: <About />,
      },
      {
        path: "/publicacoes",
        element: <Posts />,
      },
      {
        path: "/publicacoes/:id",
        element: <PostDetail />,
      },
    ],
  },
]);
