import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { PostInput } from "../../types/post";
import { listAdminPosts, makeSlug, savePost, uploadPostCover } from "../../services/posts";

const initialForm: PostInput = { title: "", excerpt: "", content: "", category: "AÇÕES", image: "", published: false, publishedAt: null };

export function PostForm() {
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState<PostInput>(initialForm);
  const [loadingPost, setLoadingPost] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;
    listAdminPosts().then((posts) => {
      const post = posts.find((item) => item.id === id);
      if (!post) throw new Error("Publicação não encontrada.");
      if (active) setForm({ title: post.title, excerpt: post.excerpt, content: post.content, category: post.category, image: post.image, published: Boolean(post.published), publishedAt: null });
    }).catch((error: unknown) => { if (active) setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar a publicação."); })
      .finally(() => { if (active) setLoadingPost(false); });
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof PostInput>(key: K, value: PostInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    setUploading(true); setErrorMessage(""); setNotice("");
    try { update("image", await uploadPostCover(file)); setNotice("Imagem enviada. Não esqueça de salvar a publicação."); }
    catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível enviar a imagem."); }
    finally { setUploading(false); }
  };

  const submit = async (publish: boolean) => {
    setSaving(true); setErrorMessage(""); setNotice("");
    try {
      await savePost({ ...form, published: publish, publishedAt: publish ? new Date().toISOString() : null }, id);
      navigate("/admin/publicacoes", { replace: true, state: { notice: publish ? "Publicação salva e publicada." : "Rascunho salvo com sucesso." } });
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "Não foi possível salvar a publicação."); }
    finally { setSaving(false); }
  };

  if (loadingPost) return <section className="admin-page"><p>Carregando publicação…</p></section>;

  return <section className="admin-page">
    <header className="admin-page-header"><div><p className="admin-eyebrow">CONTEÚDO</p><h1>{editing ? "Editar publicação" : "Nova publicação"}</h1><p>Preencha os dados que serão exibidos na página de publicações.</p></div><Link className="admin-button admin-button--ghost" to="/admin/publicacoes">Cancelar</Link></header>
    {errorMessage && <p className="admin-error" role="alert">{errorMessage}</p>}{notice && <p className="admin-notice" role="status">{notice}</p>}
    <form className="admin-editor" onSubmit={(event) => { event.preventDefault(); void submit(true); }}>
      <section className="admin-editor-main">
        <label htmlFor="post-title">Título <span>*</span></label><input id="post-title" maxLength={140} required value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Ex.: Um encontro que vai muito além de uma refeição" />
        <div className="admin-field-help">URL amigável: <code>{makeSlug(form.title) || "titulo-da-publicacao"}</code></div>
        <label htmlFor="post-excerpt">Resumo</label><textarea id="post-excerpt" rows={3} maxLength={300} value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} placeholder="Uma breve apresentação para o card da publicação." />
        <label htmlFor="post-content">Conteúdo <span>*</span></label><textarea id="post-content" rows={12} required value={form.content} onChange={(event) => update("content", event.target.value)} placeholder="Conte a história, descreva a ação ou compartilhe a notícia." />
        <p className="admin-field-help">Este editor aceita texto simples; as quebras de linha são preservadas na publicação.</p>
      </section>
      <aside className="admin-editor-side">
        <label htmlFor="post-category">Categoria</label><select id="post-category" value={form.category} onChange={(event) => update("category", event.target.value)}><option>AÇÕES</option><option>ALIMENTAÇÃO</option><option>ACOLHIMENTO</option><option>SOLIDARIEDADE</option><option>LUTA</option><option>VOLUNTARIADO</option><option>HISTÓRIAS</option><option>NOTÍCIAS</option></select>
        <div className="admin-cover-field"><span className="admin-label">Imagem de capa</span>{form.image ? <img className="admin-cover-preview" src={form.image} alt="Prévia da capa da publicação" /> : <div className="admin-cover-placeholder">Prévia da imagem</div>}<label className="admin-upload-button" htmlFor="post-cover">{uploading ? "Enviando imagem…" : "Selecionar imagem"}</label><input className="admin-file-input" id="post-cover" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void upload(event)} disabled={uploading} /><small>JPG, PNG ou WebP. Limite de 5 MB.</small></div>
        <div className="admin-editor-actions"><button className="admin-button admin-button--ghost" type="button" disabled={saving || uploading} onClick={() => void submit(false)}>Salvar rascunho</button><button className="admin-button" type="submit" disabled={saving || uploading}>{saving ? "Salvando…" : "Publicar"}</button></div>
      </aside>
    </form>
  </section>;
}
