import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";

export function AdminLayout() {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase?.auth.signOut();
    navigate("/admin/login", { replace: true });
  };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          Vozes das Ruas <small>ADMINISTRAÇÃO</small>
        </a>
        <nav aria-label="Menu administrativo" className="admin-nav">
          <NavLink to="/admin" end>
            Visão geral
          </NavLink>
          <NavLink to="/admin/publicacoes">Publicações</NavLink>
          <NavLink to="/admin/publicacoes/nova">Nova publicação</NavLink>
        </nav>
        <button
          className="admin-button admin-button--ghost admin-signout"
          onClick={signOut}
          type="button"
        >
          Sair
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
