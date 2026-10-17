-- Execute no SQL Editor do Supabase.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text not null default 'reader' check (role in ('reader', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  slug text not null unique,
  excerpt text,
  content text not null check (char_length(trim(content)) > 0),
  category text not null default 'AÇÕES',
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts add column if not exists category text not null default 'AÇÕES';

create index if not exists posts_publication_order_idx
  on public.posts (published, published_at desc);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Função SECURITY DEFINER evita recursão de RLS ao consultar profiles nas políticas.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Usuário autenticado pode apenas ler seu próprio perfil. A promoção para admin é manual.
drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

-- Visitantes podem ler somente posts publicados; admins têm gestão completa.
drop policy if exists "posts_public_read_published" on public.posts;
create policy "posts_public_read_published"
  on public.posts for select to anon, authenticated
  using (published = true or (select public.is_admin()));

drop policy if exists "posts_admin_insert" on public.posts;
create policy "posts_admin_insert"
  on public.posts for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "posts_admin_update" on public.posts;
create policy "posts_admin_update"
  on public.posts for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "posts_admin_delete" on public.posts;
create policy "posts_admin_delete"
  on public.posts for delete to authenticated
  using ((select public.is_admin()));

-- Bucket público para leitura de imagens. Escrita somente por administradores.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-covers', 'post-covers', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "post_covers_public_read" on storage.objects;
create policy "post_covers_public_read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'post-covers');

drop policy if exists "post_covers_admin_insert" on storage.objects;
create policy "post_covers_admin_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'post-covers' and (select public.is_admin()));

drop policy if exists "post_covers_admin_update" on storage.objects;
create policy "post_covers_admin_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'post-covers' and (select public.is_admin()))
  with check (bucket_id = 'post-covers' and (select public.is_admin()));

drop policy if exists "post_covers_admin_delete" on storage.objects;
create policy "post_covers_admin_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'post-covers' and (select public.is_admin()));
