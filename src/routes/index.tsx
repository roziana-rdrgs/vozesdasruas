import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { PublicLayout } from "../layouts/PublicLayout";
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/", element: <div>Home</div> }],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <div>Admin</div> }],
  },
]);
