import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isSupabaseConfigured } from "../../lib/supabase";
import { getPostBySlugOrId } from "../../services/posts";
import type { Post } from "../../types/post";
import "./PostDetail.css";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured || !id) return;
    let active = true;
    getPostBySlugOrId(id)
      .then((item) => {
        if (active) setPost(item);
      })
      .catch(() => {
        if (active)
          setErrorMessage("Não foi possível carregar esta publicação.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading)
    return (
      <section className="post-not-found">
        <div className="container">
          <p>Carregando publicação…</p>
        </div>
      </section>
    );
  if (errorMessage || !post)
    return (
      <section className="post-not-found">
        <div className="container">
          <span className="eyebrow">PUBLICAÇÃO</span>
          <h1>{errorMessage || "Publicação não encontrada."}</h1>
          <Link to="/publicacoes" className="button button--primary">
            Voltar para publicações
          </Link>
        </div>
      </section>
    );

  return (
    <article className="post-detail">
      <header className="post-detail__header">
        <div className="container">
          <Link to="/publicacoes" className="post-detail__back">
            ← Voltar para publicações
          </Link>
          <div className="post-detail__meta">
            <span>{post.category}</span>
            <time>{post.publishedAt}</time>
          </div>
          <h1>{post.title}</h1>
          <p className="post-detail__excerpt">{post.excerpt}</p>
        </div>
      </header>
      {post.image && (
        <div className="post-detail__container">
          <div className="post-detail__image">
            <img src={post.image} alt={post.title} />
          </div>
        </div>
      )}
      <div className="container">
        <div className="post-detail__content">
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
        </div>
        <footer className="post-detail__footer">
          <Link to="/publicacoes" className="button button--primary">
            Ver outras publicações
          </Link>
        </footer>
      </div>
    </article>
  );
}
