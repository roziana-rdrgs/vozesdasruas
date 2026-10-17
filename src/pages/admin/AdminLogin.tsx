import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "../../layouts/admin.css";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/admin";

  if (!isSupabaseConfigured || !supabase) return <main className="admin-login-page"><section className="admin-login-card">
    <p className="admin-eyebrow">VOZES DAS RUAS</p><h1>Configuração necessária</h1>
    <p>Configure <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> em <code>.env.local</code> e reinicie o Vite.</p><Link to="/" className="admin-text-link">Voltar ao site</Link>
  </section></main>;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setErrorMessage(""); setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      if (!data.user) throw new Error("Não foi possível validar o usuário.");
      const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
      if (profileError || profile?.role !== "admin") { await supabase.auth.signOut(); throw new Error("Este usuário não tem permissão de administração."); }
      navigate(redirectTo.startsWith("/admin") && redirectTo !== "/admin/login" ? redirectTo : "/admin", { replace: true });
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível entrar. Verifique suas credenciais."); }
    finally { setLoading(false); }
  };

  return <main className="admin-login-page"><section className="admin-login-card">
    <Link to="/" className="admin-back-link">← Voltar ao site</Link><p className="admin-eyebrow">ÁREA RESTRITA</p><h1>Entrar na administração</h1><p className="admin-subtitle">Acesse para gerenciar as publicações da ONG.</p>
    <form className="admin-form" onSubmit={submit}>
      <label htmlFor="admin-email">E-mail</label><input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="admin-password">Senha</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {errorMessage && <p className="admin-error" role="alert">{errorMessage}</p>}
      <button className="admin-button" disabled={loading} type="submit">{loading ? "Entrando…" : "Entrar"}</button>
    </form>
  </section></main>;
}
