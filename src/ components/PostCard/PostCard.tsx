interface PostCardProps {
  title: string;
  excerpt?: string;
}

export function PostCard({ title, excerpt }: PostCardProps) {
  return (
    <article>
      <h2>{title}</h2>

      {excerpt && <p>{excerpt}</p>}
    </article>
  );
}
