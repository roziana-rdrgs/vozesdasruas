export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  slug?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  published: boolean;
  publishedAt: string | null;
}
