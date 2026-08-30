import { Link } from "react-router-dom";

import type { Post } from "../../../types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-list-card">
      <Link to={`/publicacoes/${post.id}`}>
        <div className="post-list-card__image">
          <img src={post.image} alt="" />
        </div>

        <div className="post-list-card__content">
          <div className="post-list-card__meta">
            <span>{post.category}</span>
            <time>{post.publishedAt}</time>
          </div>

          <h2>{post.title}</h2>

          <p>{post.excerpt}</p>

          <span className="post-list-card__link">Ler publicação →</span>
        </div>
      </Link>
    </article>
  );
}
