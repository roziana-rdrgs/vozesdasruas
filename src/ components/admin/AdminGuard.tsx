import type { Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

interface AdminGuardProps {
  children: ReactNode;
}
type AccessState = "loading" | "allowed" | "denied";

export function AdminGuard({ children }: AdminGuardProps) {
  const location = useLocation();
  const [state, setState] = useState<AccessState>("loading");

  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      setState("denied");
      return;
    }
    let active = true;
    const checkAdmin = async (session: Session | null) => {
      if (!session?.user) {
        if (active) setState("denied");
        return;
      }
      const { data, error } = await client
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();
      if (active)
        setState(!error && data?.role === "admin" ? "allowed" : "denied");
    };
    client.auth.getSession().then(({ data }) => checkAdmin(data.session));
    const { data: listener } = client.auth.onAuthStateChange(
      (_event, session) => {
        queueMicrotask(() => {
          void checkAdmin(session);
        });
      },
    );
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading")
    return <div className="admin-loading">Verificando acesso…</div>;
  if (state === "denied")
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
}
