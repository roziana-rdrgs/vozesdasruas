import { createBrowserRouter } from "react-router-dom";
import { AdminGuard } from "../ components/admin/AdminGuard";
import { AdminLayout } from "../layouts/AdminLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { About, Home, PostDetail, Posts } from "../pages";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { AdminPosts } from "../pages/admin/AdminPosts";
import { PostForm } from "../pages/admin/PostForm";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <About /> },
      { path: "/publicacoes", element: <Posts /> },
      { path: "/publicacoes/:id", element: <PostDetail /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "publicacoes", element: <AdminPosts /> },
      { path: "publicacoes/nova", element: <PostForm /> },
      { path: "publicacoes/:id/editar", element: <PostForm /> },
    ],
  },
]);
