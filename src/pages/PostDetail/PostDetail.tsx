import { Link, useParams } from "react-router-dom";

import { posts } from "../../data/post";
import "./PostDetail.css";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const post = posts.find((item) => item.id === id);

  if (!post) {
    return (
      <section className="post-not-found">
        <div className="container">
          <span className="eyebrow">PUBLICAÇÃO</span>

          <h1>Publicação não encontrada.</h1>

          <Link to="/publicacoes" className="button button--primary">
            Voltar para publicações
          </Link>
        </div>
      </section>
    );
  }

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

      <div className="post-detail__container">
        <div className="post-detail__image">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="container">
          <div className="post-detail__content">
            <p>{post.content}</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae. Praesent vitae lorem at ipsum tincidunt
              consequat.
            </p>

            <p>
              Integer vel sem vitae erat malesuada tincidunt. Donec tincidunt
              nisl vitae tincidunt malesuada. Aliquam erat volutpat. Praesent
              commodo arcu non tincidunt elementum.
            </p>
          </div>

          <footer className="post-detail__footer">
            <Link to="/publicacoes" className="button button--primary">
              Ver outras publicações
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
