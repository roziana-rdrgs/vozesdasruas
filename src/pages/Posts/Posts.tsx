import { posts } from "./../../data/post";

import { PostCard } from "./components/PostCard";

import "./Posts.css";

export function Posts() {
  return (
    <>
      <section className="posts-hero">
        <div className="container posts-hero__content">
          <span className="eyebrow">PUBLICAÇÕES</span>

          <h1>
            Histórias que
            <br />
            precisam ser ouvidas.
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aqui
            compartilhamos histórias, ações e momentos do Vozes das Ruas.
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
