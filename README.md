# Vozes das Ruas

Website institucional da **ONG Vozes das Ruas**, criado para dar visibilidade ao projeto, suas histórias, ações e publicações, além de centralizar suas redes sociais e futuramente permitir que a equipe responsável gerencie o conteúdo através de uma área administrativa.

---

## 📌 Sobre o projeto

O **Vozes das Ruas** é um projeto desenvolvido para criar uma presença digital institucional para a ONG, permitindo que visitantes conheçam sua história, propósito, ações e acompanhem as publicações realizadas pela organização.

A plataforma será construída inicialmente como um protótipo institucional e evoluirá para uma aplicação completa, permitindo que a administração publique e gerencie conteúdos sem necessidade de alterações no código-fonte.

### Objetivos

* Apresentar a ONG e o projeto.
* Dar visibilidade às ações realizadas.
* Compartilhar histórias e publicações.
* Centralizar as redes sociais.
* Facilitar o contato com a organização.
* Criar um canal institucional próprio.
* Permitir que a administração publique conteúdos.
* Criar uma estrutura preparada para futuras funcionalidades.

---

## 🎯 Escopo

O projeto será desenvolvido em fases, começando por uma versão visual para validação e apresentação do protótipo.

### Site público

O site contará inicialmente com:

* Home
* Sobre o projeto
* Conheça o projeto
* Publicações
* Página individual de publicação
* Redes sociais
* Contato
* Rodapé institucional

### Área administrativa

Em uma segunda etapa, será criada uma área administrativa para:

* Login
* Dashboard
* Criar publicação
* Editar publicação
* Excluir publicação
* Publicar/despublicar conteúdo
* Upload de imagens
* Gerenciamento das publicações

---

# 🛠️ Tecnologias

## Frontend

* React
* TypeScript
* Vite
* React Router
* CSS / Tailwind CSS

## Backend / Dados

* Supabase
* PostgreSQL
* Supabase Auth
* Supabase Storage

## Deploy

* Vercel

## Versionamento

* Git
* GitHub

---

# 🏗️ Arquitetura

A arquitetura inicial será simples e preparada para evolução.

```text
                    ┌───────────────────┐
                    │      Vercel       │
                    │                   │
                    │  React + Vite     │
                    └─────────┬─────────┘
                              │
                              │ HTTPS
                              ▼
                    ┌───────────────────┐
                    │     Supabase      │
                    │                   │
                    │  Authentication  │
                    │  PostgreSQL       │
                    │  Storage          │
                    └─────────┬─────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
            profiles        posts        storage
             admins      publicações       imagens
```

Nesta primeira versão não será utilizado um backend próprio como NestJS.

O Supabase será responsável por:

* Banco de dados
* Autenticação
* Storage
* API para acesso aos dados
* Controle de acesso através de RLS

---

# 📁 Estrutura do projeto

A estrutura planejada para o frontend:

```text
src/
│
├── assets/
│
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── Button/
│   ├── PostCard/
│   └── SectionTitle/
│
├── layouts/
│   ├── PublicLayout.tsx
│   └── AdminLayout.tsx
│
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Posts/
│   ├── PostDetail/
│   │
│   └── admin/
│       ├── Login/
│       ├── Dashboard/
│       └── Posts/
│           ├── PostList/
│           ├── PostForm/
│           └── PostEdit/
│
├── services/
│   ├── posts.ts
│   └── storage.ts
│
├── lib/
│   └── supabase.ts
│
├── hooks/
│
├── types/
│   ├── post.ts
│   └── profile.ts
│
├── routes/
│   └── index.tsx
│
├── App.tsx
└── main.tsx
```

---

# 🗺️ Rotas

## Site público

```text
/
```

Página inicial.

```text
/sobre
```

Informações sobre o projeto e a ONG.

```text
/publicacoes
```

Lista de publicações.

```text
/publicacoes/:slug
```

Detalhes de uma publicação.

---

## Área administrativa

```text
/admin/login
```

Login da administradora.

```text
/admin
```

Dashboard administrativo.

```text
/admin/publicacoes
```

Lista de publicações.

```text
/admin/publicacoes/nova
```

Criação de publicação.

```text
/admin/publicacoes/:id/editar
```

Edição de publicação.

---

# 🗄️ Banco de dados

O banco será PostgreSQL através do Supabase.

## Tabela `profiles`

Responsável pelos usuários administrativos.

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  name text,
  role text default 'admin',
  created_at timestamptz default now()
);
```

---

## Tabela `posts`

Responsável pelas publicações.

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),

  title text not null,

  slug text unique not null,

  excerpt text,

  content text not null,

  cover_image_url text,

  published boolean default false,

  published_at timestamptz,

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);
```

### Campos

| Campo           | Tipo        | Descrição                |
| --------------- | ----------- | ------------------------ |
| id              | UUID        | Identificador            |
| title           | TEXT        | Título                   |
| slug            | TEXT        | URL amigável             |
| excerpt         | TEXT        | Resumo                   |
| content         | TEXT        | Conteúdo                 |
| cover_image_url | TEXT        | Imagem de capa           |
| published       | BOOLEAN     | Define se está publicado |
| published_at    | TIMESTAMPTZ | Data da publicação       |
| created_at      | TIMESTAMPTZ | Data de criação          |
| updated_at      | TIMESTAMPTZ | Última atualização       |

---

## Tabela `social_links`

Responsável pelos links das redes sociais.

```sql
create table social_links (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  url text not null,

  icon text,

  is_active boolean default true,

  sort_order integer default 0
);
```

Exemplo:

```text
Instagram
Facebook
TikTok
YouTube
WhatsApp
```

---

# 🖼️ Storage

As imagens não serão armazenadas diretamente no banco.

Será utilizado o Supabase Storage.

Estrutura planejada:

```text
storage/
│
├── posts/
│   ├── post-1.jpg
│   ├── post-2.jpg
│   └── post-3.jpg
│
└── project/
    ├── logo.png
    ├── banner.jpg
    └── about.jpg
```

O banco armazenará somente a URL da imagem.

Exemplo:

```text
cover_image_url
```

---

# 🔐 Autenticação

A área administrativa utilizará o Supabase Auth.

Fluxo:

```text
Administradora
      │
      ▼
/admin/login
      │
      ▼
Supabase Auth
      │
      ▼
Usuário autenticado
      │
      ▼
profiles
      │
      ▼
role = admin
      │
      ▼
Área administrativa
```

A senha não será armazenada ou validada diretamente no frontend.

---

# 🔒 Segurança

As tabelas do Supabase deverão utilizar **Row Level Security (RLS)**.

### Visitante

Pode:

```text
SELECT publicações publicadas
SELECT links sociais
```

Não pode:

```text
INSERT
UPDATE
DELETE
```

### Administradora

Pode:

```text
SELECT
INSERT
UPDATE
DELETE
```

sobre as publicações.

---

# 🚀 Fases de implementação

O desenvolvimento será dividido em fases para permitir que uma primeira versão seja apresentada rapidamente e, posteriormente, evolua para uma aplicação completa.

---

# FASE 0 — Preparação do projeto

### Objetivo

Preparar o ambiente de desenvolvimento e a estrutura inicial do projeto.

### Tarefas

* [ ] Clonar repositório
* [ ] Configurar React + Vite
* [ ] Configurar TypeScript
* [ ] Configurar Git
* [ ] Configurar ESLint
* [ ] Configurar Prettier
* [ ] Configurar React Router
* [ ] Definir estrutura de pastas
* [ ] Criar layout base
* [ ] Criar Header
* [ ] Criar Footer

### Resultado

Projeto React funcionando localmente.

---

# FASE 1 — Protótipo institucional

### Objetivo

Criar uma primeira versão visual para apresentar à ONG.

Nesta etapa ainda não será necessário banco de dados.

Os conteúdos poderão ser mockados diretamente no frontend.

### Páginas

* [ ] Home
* [ ] Sobre
* [ ] Publicações
* [ ] Detalhe da publicação
* [ ] Redes sociais
* [ ] Contato

### Home

* [ ] Hero
* [ ] Apresentação do projeto
* [ ] Sobre
* [ ] Destaques
* [ ] Publicações recentes
* [ ] Redes sociais
* [ ] CTA
* [ ] Footer

### Publicações

* [ ] Cards
* [ ] Imagem
* [ ] Título
* [ ] Resumo
* [ ] Data
* [ ] Link para publicação

### Responsividade

* [ ] Desktop
* [ ] Tablet
* [ ] Mobile

### Resultado esperado

Um site navegável e visualmente pronto para demonstração.

```text
React
  │
  ▼
Dados mockados
  │
  ▼
Site institucional
  │
  ▼
Deploy
```

---

# FASE 2 — Identidade visual

### Objetivo

Aproximar o site da identidade da Vozes das Ruas.

### Tarefas

* [ ] Definir paleta de cores
* [ ] Definir tipografia
* [ ] Definir estilos de títulos
* [ ] Definir espaçamentos
* [ ] Aplicar identidade visual
* [ ] Adicionar logo
* [ ] Selecionar imagens
* [ ] Definir estilo dos cards
* [ ] Ajustar versão mobile
* [ ] Melhorar acessibilidade

### Resultado

Protótipo visual validado.

---

# FASE 3 — Supabase

### Objetivo

Substituir os dados mockados por dados reais.

### Tarefas

* [ ] Criar projeto no Supabase
* [ ] Configurar PostgreSQL
* [ ] Criar tabela `profiles`
* [ ] Criar tabela `posts`
* [ ] Criar tabela `social_links`
* [ ] Criar Storage
* [ ] Configurar variáveis de ambiente
* [ ] Criar cliente Supabase
* [ ] Criar services
* [ ] Criar tipos TypeScript

### Resultado

```text
React
   │
   ▼
Supabase
   │
   ├── PostgreSQL
   ├── Auth
   └── Storage
```

---

# FASE 4 — Autenticação

### Objetivo

Criar acesso seguro para a área administrativa.

### Tarefas

* [ ] Criar usuário administrador
* [ ] Criar tela de login
* [ ] Implementar login
* [ ] Implementar logout
* [ ] Validar sessão
* [ ] Criar proteção das rotas `/admin`
* [ ] Criar tabela `profiles`
* [ ] Configurar role `admin`

### Resultado

Somente usuários autorizados poderão acessar a administração.

---

# FASE 5 — Área administrativa

### Objetivo

Permitir que a ONG gerencie as publicações.

### Dashboard

* [ ] Dashboard
* [ ] Total de publicações
* [ ] Publicações publicadas
* [ ] Rascunhos
* [ ] Atalhos

### Publicações

* [ ] Listar publicações
* [ ] Criar publicação
* [ ] Editar publicação
* [ ] Excluir publicação
* [ ] Publicar
* [ ] Despublicar
* [ ] Criar slug automaticamente
* [ ] Upload de imagem

### Resultado

A administradora poderá gerenciar o conteúdo sem alterar o código.

---

# FASE 6 — Editor de conteúdo

### Objetivo

Melhorar a experiência de criação das publicações.

### Funcionalidades

* [ ] Editor de texto
* [ ] Negrito
* [ ] Itálico
* [ ] Títulos
* [ ] Listas
* [ ] Links
* [ ] Imagens
* [ ] Preview da publicação
* [ ] Salvar rascunho
* [ ] Publicar

### Fluxo

```text
Nova publicação
       │
       ▼
Preencher conteúdo
       │
       ├─────────────┐
       ▼             ▼
   Rascunho       Publicar
                     │
                     ▼
              Site público
```

---

# FASE 7 — Melhorias de conteúdo

### Objetivo

Criar uma estrutura mais completa para as publicações.

Possíveis novos campos:

```text
category
tags
author
featured
video_url
instagram_url
```

### Funcionalidades

* [ ] Categorias
* [ ] Tags
* [ ] Publicações em destaque
* [ ] Autor
* [ ] Vídeos
* [ ] Links externos
* [ ] Busca
* [ ] Filtro por categoria
* [ ] Paginação

---

# FASE 8 — SEO e compartilhamento

### Objetivo

Melhorar a presença da ONG nos mecanismos de busca e redes sociais.

### Tarefas

* [ ] Meta title
* [ ] Meta description
* [ ] Open Graph
* [ ] Imagem de compartilhamento
* [ ] URLs amigáveis
* [ ] Sitemap
* [ ] Robots.txt
* [ ] Favicon
* [ ] Dados estruturados
* [ ] SEO das publicações

Exemplo:

```text
/publicacoes/historia-de-joao
```

em vez de:

```text
/post?id=123
```

---

# FASE 9 — Analytics

### Objetivo

Entender como as pessoas utilizam o site.

Métricas possíveis:

* Visitas
* Páginas mais acessadas
* Publicações mais visualizadas
* Origem dos visitantes
* Dispositivo
* País/região
* Cliques nas redes sociais
* Cliques em contato
* Conversões

Possíveis ferramentas:

* Google Analytics
* Google Search Console

---

# FASE 10 — Domínio e publicação oficial

### Objetivo

Publicar o projeto com domínio próprio.

### Tarefas

* [ ] Registrar domínio
* [ ] Configurar DNS
* [ ] Configurar domínio no Vercel
* [ ] Configurar HTTPS
* [ ] Validar SEO
* [ ] Validar mobile
* [ ] Validar acessibilidade
* [ ] Validar formulários
* [ ] Criar backup do banco
* [ ] Publicar versão oficial

Fluxo:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Domínio próprio
   │
   ▼
Site Vozes das Ruas
```

---

# FASE 11 — Evoluções futuras

Após o lançamento, novas funcionalidades poderão ser adicionadas conforme as necessidades da ONG.

Possibilidades:

* [ ] Cadastro de voluntários
* [ ] Formulário para voluntariado
* [ ] Doações
* [ ] Cadastro de apoiadores
* [ ] Newsletter
* [ ] Eventos
* [ ] Galeria de fotos
* [ ] Galeria de vídeos
* [ ] Projetos da ONG
* [ ] Página de transparência
* [ ] Prestação de contas
* [ ] Área de parceiros
* [ ] Newsletter
* [ ] Integração com WhatsApp
* [ ] Integração com redes sociais
* [ ] Sistema de campanhas

---

# 📊 Roadmap resumido

```text
FASE 0
Preparação
   │
   ▼
FASE 1
Protótipo institucional
   │
   ▼
FASE 2
Identidade visual
   │
   ▼
FASE 3
Supabase
   │
   ▼
FASE 4
Autenticação
   │
   ▼
FASE 5
Área administrativa
   │
   ▼
FASE 6
Editor de conteúdo
   │
   ▼
FASE 7
Melhorias
   │
   ▼
FASE 8
SEO
   │
   ▼
FASE 9
Analytics
   │
   ▼
FASE 10
Domínio + produção
   │
   ▼
FASE 11
Novas funcionalidades
```

---

# 🧪 Estratégia de desenvolvimento

O projeto será desenvolvido de forma incremental.

Cada fase deverá gerar uma versão funcional.

### Exemplo

```text
v0.1.0
Protótipo inicial

v0.2.0
Identidade visual

v0.3.0
Supabase

v0.4.0
Autenticação

v0.5.0
Área administrativa

v0.6.0
Editor de conteúdo

v1.0.0
Primeira versão oficial
```

---

# 🌿 Estratégia de Git

Sugestão de branches:

```text
main
│
├── develop
│
├── feature/home
├── feature/about
├── feature/posts
├── feature/supabase
├── feature/auth
├── feature/admin
└── feature/editor
```

### Commits

Utilizar mensagens seguindo Conventional Commits:

```text
feat: adiciona página inicial

feat: adiciona listagem de publicações

feat: adiciona integração com supabase

feat: adiciona autenticação administrativa

fix: corrige responsividade da home

style: ajusta identidade visual

refactor: reorganiza componentes
```

---

# ⚙️ Instalação

## Pré-requisitos

* Node.js
* npm
* Git

Verificar:

```bash
node --version
npm --version
git --version
```

---

## Instalação

Clonar o projeto:

```bash
git clone https://github.com/roziana-rdrgs/vozesdasruas.git
```

Entrar no diretório:

```bash
cd vozesdasruas
```

Instalar dependências:

```bash
npm install
```

Executar:

```bash
npm run dev
```

O projeto estará disponível localmente.

---

# 🔐 Variáveis de ambiente

Após a integração com o Supabase, criar:

```text
.env.local
```

Exemplo:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

As variáveis de ambiente não devem ser versionadas no Git.

Adicionar ao `.gitignore`:

```text
.env
.env.local
.env.*.local
```

---

# 🚀 Deploy

O deploy será realizado através da Vercel.

Fluxo:

```text
Desenvolvimento
      │
      ▼
    Git
      │
      ▼
   GitHub
      │
      ▼
   Vercel
      │
      ▼
   Deploy
```

A cada alteração aprovada na branch de produção, uma nova versão poderá ser publicada automaticamente.

---

# 📝 Gestão de conteúdo

Depois da implementação da área administrativa, o fluxo para publicação será:

```text
Administradora
      │
      ▼
Login
      │
      ▼
Dashboard
      │
      ▼
Nova publicação
      │
      ├── Título
      ├── Resumo
      ├── Imagem
      └── Conteúdo
      │
      ▼
Publicar
      │
      ▼
Supabase
      │
      ▼
Site público
```

Dessa forma, a ONG poderá atualizar o site sem depender de um desenvolvedor para cada publicação.

---

# 📱 Responsividade

O site deverá funcionar adequadamente em:

* Desktop
* Notebook
* Tablet
* Smartphone

A abordagem será **mobile-first**, priorizando a experiência de navegação em dispositivos móveis.

---

# ♿ Acessibilidade

A acessibilidade será considerada desde o desenvolvimento.

Principais pontos:

* HTML semântico
* Contraste adequado
* Textos alternativos para imagens
* Navegação por teclado
* Foco visível
* Botões acessíveis
* Labels em formulários
* Hierarquia correta de títulos
* Responsividade

---

# 🔎 SEO

O projeto deverá considerar:

* URLs amigáveis
* Títulos únicos
* Meta descriptions
* Open Graph
* Sitemap
* Robots.txt
* Conteúdo semântico
* Performance
* Imagens otimizadas

---

# 🧹 Qualidade de código

Princípios:

* TypeScript
* Componentização
* Código reutilizável
* Separação de responsabilidades
* Nomes descritivos
* Evitar duplicação
* ESLint
* Prettier
* Commits padronizados

---

# 🧪 Testes

A estratégia de testes poderá evoluir junto com o projeto.

### Primeira etapa

* Testes manuais
* Responsividade
* Navegação
* Formulários

### Evolução

* Testes unitários
* Testes de componentes
* Testes de integração
* Testes E2E

Possíveis ferramentas:

```text
Vitest
React Testing Library
Playwright
```

---

# 📌 Backlog inicial

## Alta prioridade

* [ ] Criar projeto React
* [ ] Criar Home
* [ ] Criar página Sobre
* [ ] Criar página Publicações
* [ ] Criar detalhe da publicação
* [ ] Criar Footer
* [ ] Criar Header
* [ ] Responsividade
* [ ] Deploy do protótipo

## Média prioridade

* [ ] Criar Supabase
* [ ] Criar banco
* [ ] Criar Storage
* [ ] Criar autenticação
* [ ] Criar área administrativa
* [ ] Criar CRUD de publicações

## Baixa prioridade / evolução

* [ ] Editor avançado
* [ ] Categorias
* [ ] Tags
* [ ] Busca
* [ ] SEO avançado
* [ ] Analytics
* [ ] Newsletter
* [ ] Doações
* [ ] Eventos

---

# 🎯 Primeiro objetivo

O primeiro marco do projeto será disponibilizar uma versão navegável e visualmente refinada do site para apresentação à ONG.

### Entrega inicial

```text
✓ Home
✓ Sobre
✓ Publicações
✓ Detalhes
✓ Redes sociais
✓ Contato
✓ Responsivo
✓ Identidade visual inicial
✓ Deploy online
```

Neste primeiro momento, as publicações poderão utilizar dados mockados.

Após a validação visual e estrutural, o projeto avançará para a integração com Supabase e criação da área administrativa.

---

# 📈 Visão de longo prazo

O objetivo é que o projeto evolua de:

```text
Protótipo
   ↓
Site institucional
   ↓
Site administrável
   ↓
Portal da ONG
```

A plataforma poderá se tornar um canal central para:

* Comunicação
* Publicação de histórias
* Divulgação de projetos
* Captação de voluntários
* Divulgação de eventos
* Relacionamento com apoiadores
* Transparência
* Doações

---

## 🔗 Links

* Repositório: https://github.com/roziana-rdrgs/vozesdasruas
* Instagram: https://www.instagram.com/vozesdasruasm/

---

## 👩‍💻 Desenvolvimento

Projeto desenvolvido por **Roziana Rodrigues**.

---

