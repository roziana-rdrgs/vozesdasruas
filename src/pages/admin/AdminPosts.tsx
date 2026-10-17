import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../../types/post";
import { deletePost, listAdminPosts, setPostPublished } from "../../services/posts";

export function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]); const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); const [notice, setNotice] = useState("");
  const loadPosts = useCallback(async () => {
    setLoading(true); setErrorMessage("");
    try { setPosts(await listAdminPosts()); }
    catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar as publicações."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void loadPosts(); }, [loadPosts]);
  const togglePublished = async (post: Post) => {
    try { await setPostPublished(post.id, !post.published); setNotice(post.published ? "Publicação movida para rascunhos." : "Publicação publicada no site."); await loadPosts(); }
    catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível alterar o status."); }
  };
  const removePost = async (post: Post) => {
    if (!window.confirm(`Excluir a publicação “${post.title}”? Esta ação não pode ser desfeita.`)) return;
    try { await deletePost(post.id); setNotice("Publicação excluída."); await loadPosts(); }
    catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível excluir a publicação."); }
  };
  return <section className="admin-page">
    <header className="admin-page-header"><div><p className="admin-eyebrow">CONTEÚDO</p><h1>Publicações</h1><p>Crie, revise e publique as notícias e ações da ONG.</p></div><Link to="/admin/publicacoes/nova" className="admin-button">+ Nova publicação</Link></header>
    {notice && <p className="admin-notice" role="status">{notice}</p>}{errorMessage && <p className="admin-error" role="alert">{errorMessage}</p>}
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Publicação</th><th>Categoria</th><th>Status</th><th>Data</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>
      {loading ? <tr><td colSpan={5}>Carregando publicações…</td></tr> : posts.length === 0 ? <tr><td colSpan={5}>Nenhuma publicação cadastrada. Crie a primeira!</td></tr> : posts.map((post) => <tr key={post.id}>
        <td><div className="admin-post-cell">{post.image && <img src={post.image} alt="" />}<div><strong>{post.title}</strong><small>{post.excerpt}</small></div></div></td>
        <td>{post.category}</td><td><span className={`admin-status ${post.published ? "admin-status--published" : "admin-status--draft"}`}>{post.published ? "Publicado" : "Rascunho"}</span></td><td>{post.publishedAt || "—"}</td>
        <td><div className="admin-row-actions"><Link to={`/admin/publicacoes/${post.id}/editar`}>Editar</Link><button type="button" onClick={() => void togglePublished(post)}>{post.published ? "Despublicar" : "Publicar"}</button><button type="button" className="admin-danger-link" onClick={() => void removePost(post)}>Excluir</button></div></td>
      </tr>)}
    </tbody></table></div>
  </section>;
}
