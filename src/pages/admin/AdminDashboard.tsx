import { Link } from "react-router-dom";

export function AdminDashboard() {
  return <section className="admin-page">
    <header className="admin-page-header"><div><p className="admin-eyebrow">PAINEL ADMINISTRATIVO</p><h1>Bem-vinda!</h1><p>Gerencie as histórias e ações compartilhadas pelo Vozes das Ruas.</p></div><Link className="admin-button" to="/admin/publicacoes/nova">+ Nova publicação</Link></header>
    <div className="admin-welcome-card"><div><h2>Conteúdo com propósito</h2><p>Cadastre uma publicação, adicione uma imagem e escolha entre salvar como rascunho ou publicar no site.</p><Link className="admin-text-link" to="/admin/publicacoes">Gerenciar publicações →</Link></div><span aria-hidden="true" className="admin-welcome-mark">VR</span></div>
  </section>;
}
