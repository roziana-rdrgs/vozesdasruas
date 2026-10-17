import { supabase } from "../lib/supabase";
import type { Post, PostInput } from "../types/post";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const formatDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeZone: "UTC",
      }).format(date);
};

const toPost = (row: PostRow): Post => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt ?? "",
  content: row.content,
  category: row.category ?? "AÇÕES",
  image: row.cover_image_url ?? "",
  published: row.published,
  publishedAt: formatDate(row.published_at),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `publicacao-${Date.now()}`;

export const makeSlug = slugify;

export async function listPublicPosts(): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,title,slug,excerpt,content,category,cover_image_url,published,published_at,created_at,updated_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return ((data ?? []) as PostRow[]).map(toPost);
}

export async function listAdminPosts(): Promise<Post[]> {
  if (!supabase)
    throw new Error(
      "Configure o Supabase no arquivo .env.local para gerenciar publicações.",
    );
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,title,slug,excerpt,content,category,cover_image_url,published,published_at,created_at,updated_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as PostRow[]).map(toPost);
}

export async function getPostBySlugOrId(
  identifier: string,
): Promise<Post | null> {
  if (!supabase) return null;
  const selection =
    "id,title,slug,excerpt,content,category,cover_image_url,published,published_at,created_at,updated_at";
  const { data: bySlug, error: slugError } = await supabase
    .from("posts")
    .select(selection)
    .eq("published", true)
    .eq("slug", identifier)
    .maybeSingle();
  if (slugError) throw slugError;
  if (bySlug) return toPost(bySlug as PostRow);

  // Fallback para links antigos que usam o ID no caminho.
  const { data: byId, error: idError } = await supabase
    .from("posts")
    .select(selection)
    .eq("published", true)
    .eq("id", identifier)
    .maybeSingle();
  if (idError) {
    // IDs da versão mockada podem não ser UUIDs; nesse caso apenas não há publicação no banco.
    if (idError.code === "22P02") return null;
    throw idError;
  }
  return byId ? toPost(byId as PostRow) : null;
}

export async function savePost(input: PostInput, id?: string): Promise<void> {
  if (!supabase) throw new Error("Configure o Supabase no arquivo .env.local.");
  const payload = {
    title: input.title.trim(),
    slug: slugify(input.title),
    excerpt: input.excerpt.trim() || null,
    content: input.content.trim(),
    category: input.category,
    cover_image_url: input.image || null,
    published: input.published,
    published_at: input.published
      ? input.publishedAt || new Date().toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };
  const query = id
    ? supabase.from("posts").update(payload).eq("id", id)
    : supabase.from("posts").insert(payload);
  const { error } = await query;
  if (error) throw error;
}

export async function setPostPublished(
  id: string,
  published: boolean,
): Promise<void> {
  if (!supabase) throw new Error("Configure o Supabase no arquivo .env.local.");
  const { error } = await supabase
    .from("posts")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deletePost(id: string): Promise<void> {
  if (!supabase) throw new Error("Configure o Supabase no arquivo .env.local.");
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadPostCover(file: File): Promise<string> {
  if (!supabase) throw new Error("Configure o Supabase no arquivo .env.local.");
  if (!file.type.startsWith("image/"))
    throw new Error("Escolha um arquivo de imagem.");
  if (file.size > 5 * 1024 * 1024)
    throw new Error("A imagem deve ter no máximo 5 MB.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage
    .from("post-covers")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
  if (error) throw error;
  const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
  return data.publicUrl;
}
