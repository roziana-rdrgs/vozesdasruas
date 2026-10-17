# Área administrativa — Vozes das Ruas

Este pacote contém uma implementação inicial da área administrativa integrada ao Supabase. Não foi possível criar uma branch no GitHub pela conexão disponível, então os arquivos estão organizados para serem copiados para o repositório local.

## O que inclui

- Login com Supabase Auth em `/admin/login`.
- Proteção da área administrativa por sessão e perfil `admin`.
- Listagem, criação, edição, publicação/despublicação e exclusão de publicações.
- Upload de imagem de capa no Supabase Storage.
- As telas públicas de publicações consultam o Supabase quando as variáveis estiverem configuradas e mantêm os dados mockados como fallback durante o desenvolvimento.
- SQL com tabelas, RLS e políticas de Storage.

## Passos

1. Na raiz do projeto, instale a dependência:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Copie as pastas `src/` e `supabase/` deste pacote para a raiz do repositório, mesclando os arquivos existentes quando indicado abaixo.
3. Adicione `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICAVEL
   ```
   Use a chave pública/publishable do projeto. Nunca coloque `service_role` no frontend.
4. No SQL Editor do Supabase, execute `supabase/schema.sql`.
5. No Supabase Auth, crie o usuário administrativo por convite ou por criação segura de usuário.
6. Copie o UUID desse usuário em `auth.users` e execute, substituindo o UUID:
   ```sql
   insert into public.profiles (id, name, role)
   values ('UUID-DO-USUARIO-AQUI', 'Administradora', 'admin')
   on conflict (id) do update set role = 'admin';
   ```
7. Inicie o projeto com `npm run dev` e acesse `/admin/login`.
8. Teste login, criação de rascunho, upload, publicação e a página pública `/publicacoes`.

## Arquivos para mesclar

- Substituir `src/routes/index.tsx` pelo arquivo correspondente deste pacote.
- Substituir `src/pages/Posts/Posts.tsx` pelo arquivo correspondente.
- Substituir `src/pages/PostDetail/PostDetail.tsx` pelo arquivo correspondente.
- Adicionar os demais arquivos sem substituir outras páginas.
- O arquivo `src/types/post.ts` passa a incluir `slug`, `published` e campos opcionais úteis para a integração; a lista antiga segue compatível.

## Observações de segurança

- As rotas do frontend melhoram o fluxo da interface, mas a segurança real é aplicada pelo RLS do Supabase.
- A tabela `profiles` não oferece autoelevação de privilégio. O papel `admin` deve ser atribuído manualmente a usuários confiáveis.
- O bucket de capas é público para leitura das imagens publicadas; upload, atualização e exclusão exigem perfil admin.
- O protótipo da Home ainda contém cards estáticos e deve ser migrado depois para a mesma consulta de publicações se a Home também precisar refletir o conteúdo cadastrado.
