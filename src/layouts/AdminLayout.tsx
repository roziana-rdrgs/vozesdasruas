import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div>
      <header>
        <strong>Vozes das Ruas</strong>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
