import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabase";
import { listPublicPosts } from "../../services/posts";
import type { Post } from "../../types/post";
import { PostCard } from "./components/PostCard";
import "./Posts.css";

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    listPublicPosts()
      .then((items) => {
        if (active) setPosts(items);
      })
      .catch(() => {
        if (active)
          setErrorMessage(
            "Não foi possível carregar as publicações agora. Tente novamente mais tarde.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="posts-hero">
        <div className="container posts-hero__content">
          <span className="eyebrow">PUBLICAÇÕES</span>
          <h1>
            Histórias que
            <br /> precisam ser ouvidas.
          </h1>
          <p>
            Aqui compartilhamos histórias, ações e momentos do Vozes das Ruas.
          </p>
        </div>
      </section>
      <section className="section posts">
        <div className="container">
          <div className="posts__header">
            <div>
              <span className="eyebrow">TODAS AS PUBLICAÇÕES</span>
              <h2>Conheça nosso trabalho.</h2>
            </div>
          </div>
          {loading && <p role="status">Carregando publicações…</p>}
          {errorMessage && <p role="alert">{errorMessage}</p>}
          {!loading && !errorMessage && posts.length === 0 && (
            <p>
              Em breve, novas histórias e ações serão compartilhadas por aqui.
            </p>
          )}
          <div className="posts__grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
