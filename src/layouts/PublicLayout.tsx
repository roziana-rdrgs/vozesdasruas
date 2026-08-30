import { Outlet } from "react-router-dom";
import { Footer, Header } from "../ components";

export function PublicLayout() {
  return (
    <div className="public-layout">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
