# 🚀 Configuração do Painel Administrativo - Amplie Seu MKT

## 📋 Pré-requisitos

1. Conta no Supabase (gratuita)
2. Projeto Supabase criado

## 🔧 Passo a Passo

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
```

**Como obter essas informações:**
- Acesse seu projeto no Supabase
- Vá em `Settings` → `API`
- Copie a `Project URL` e cole em `VITE_SUPABASE_URL`
- Copie a `anon/public key` e cole em `VITE_SUPABASE_ANON_KEY`

### 2. Executar Migration SQL

Copie e execute o seguinte SQL no Supabase SQL Editor:

```sql
-- Create enum for user roles
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create portfolio table
create table public.portfolio (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text unique not null,
    short_description text not null,
    full_description text not null,
    cover_image text not null,
    gallery jsonb default '[]'::jsonb,
    project_link text,
    tags text[] default '{}'::text[],
    category text not null,
    published boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on portfolio
alter table public.portfolio enable row level security;

-- Portfolio policies
create policy "Anyone can view published portfolio items"
on public.portfolio for select
using (published = true);

create policy "Admins can do everything on portfolio"
on public.portfolio for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Create blog table
create table public.blog (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text unique not null,
    subtitle text,
    cover_image text not null,
    content text not null,
    excerpt text,
    tags text[] default '{}'::text[],
    author text not null,
    author_avatar text,
    category text not null,
    read_time integer default 5,
    published boolean default false,
    seo_title text,
    seo_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on blog
alter table public.blog enable row level security;

-- Blog policies
create policy "Anyone can view published blog posts"
on public.blog for select
using (published = true);

create policy "Admins can do everything on blog"
on public.blog for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for uploads
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Anyone can view uploads"
on storage.objects for select
using (bucket_id = 'uploads');

create policy "Admins can upload files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'uploads' and
  public.has_role(auth.uid(), 'admin')
);

create policy "Admins can delete files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'uploads' and
  public.has_role(auth.uid(), 'admin')
);

-- Function to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger on_portfolio_updated
  before update on public.portfolio
  for each row execute procedure public.handle_updated_at();

create trigger on_blog_updated
  before update on public.blog
  for each row execute procedure public.handle_updated_at();

-- Function to generate slug from title
create or replace function public.generate_slug(title text)
returns text
language plpgsql
as $$
begin
  return lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
end;
$$;
```

### 3. Criar Usuário Admin

Depois de executar a migration:

1. Vá em `Authentication` → `Users` no Supabase
2. Clique em `Add user` → `Create new user`
3. Adicione email e senha (este será seu admin)
4. Após criar, copie o `User UID`
5. Execute no SQL Editor:

```sql
-- Substitua 'SEU_USER_ID_AQUI' pelo UID do usuário criado
insert into public.user_roles (user_id, role)
values ('SEU_USER_ID_AQUI', 'admin');
```

### 4. Configurar Email (Opcional mas Recomendado)

Para que confirmação de email funcione corretamente:

1. Vá em `Authentication` → `Email Templates`
2. Customize os templates se desejar
3. Em `Authentication` → `Settings`:
   - Para testes: desabilite "Confirm email"
   - Para produção: configure um provedor SMTP customizado

### 5. Configurar Storage

1. Vá em `Storage` no Supabase
2. Verifique se o bucket `uploads` foi criado
3. Se não foi criado automaticamente, crie manualmente:
   - Nome: `uploads`
   - Public: `true`

## 🎯 Acessar o Painel

Após configurar tudo:

1. Acesse: `http://localhost:8080/admin/login`
2. Faça login com o email/senha do admin criado
3. Pronto! Você terá acesso ao painel completo

## 📚 Funcionalidades

### Portfolio
- ✅ Criar, editar e deletar projetos
- ✅ Upload de imagens
- ✅ Publicar/despublicar
- ✅ Tags e categorias
- ✅ SEO-friendly slugs

### Blog
- ✅ Editor rich text (Quill)
- ✅ Upload de imagens
- ✅ SEO (meta title/description)
- ✅ Publicar/despublicar
- ✅ Cálculo automático de tempo de leitura
- ✅ Tags e categorias

## 🔒 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Apenas admins podem criar/editar/deletar
- Conteúdo publicado é público
- Tokens seguros com Supabase Auth

## 📡 API Pública

Para consumir os dados no site principal:

### Listar Portfolio Publicado
```javascript
import { supabase } from '@/integrations/supabase/client';

const { data, error } = await supabase
  .from('portfolio')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false });
```

### Listar Blog Publicado
```javascript
const { data, error } = await supabase
  .from('blog')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false });
```

### Buscar Post por Slug
```javascript
const { data, error } = await supabase
  .from('blog')
  .select('*')
  .eq('slug', 'seu-slug-aqui')
  .eq('published', true)
  .single();
```

## 🚨 Solução de Problemas

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe
- Confirme que as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Não consigo fazer login
- Confirme que o usuário foi criado no Supabase
- Verifique se adicionou a role de admin
- Verifique as credenciais

### Upload de imagens não funciona
- Verifique se o bucket `uploads` existe
- Confirme que o bucket está público
- Verifique as políticas RLS do storage

### Mudanças não aparecem no site
- Verifique se o item está marcado como "publicado"
- Confirme que está consultando os dados corretos
- Limpe o cache do navegador

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação do Supabase
2. Confira os logs do console do navegador
3. Revise as políticas RLS no Supabase

## 🎨 Customização

O painel usa o design system da Amplie:
- Cores: Azul, Preto e Branco
- Componentes: shadcn/ui
- Estilo: Minimalista e moderno

Para customizar cores, edite `src/index.css` e `tailwind.config.ts`.
