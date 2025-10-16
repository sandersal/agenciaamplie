# Amplie - Painel Admin do Blog

Este é o painel administrativo independente para gerenciar o blog da Amplie.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Projeto Supabase configurado (mesma instância do site principal)

## 🚀 Instalação

1. Entre na pasta do admin:
```bash
cd admin-blog
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🔧 Desenvolvimento

Para rodar o servidor de desenvolvimento na porta 3001:
```bash
npm run dev
```

Acesse: http://localhost:3001

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`

## 🌐 Deploy

Este painel pode ser deployado independentemente em qualquer serviço de hospedagem:

- **Vercel**: `vercel --prod`
- **Netlify**: Arraste a pasta `dist` ou conecte o repositório
- **GitHub Pages**: Configure o GitHub Actions para deploy
- **Outro servidor**: Faça upload da pasta `dist` para o servidor web

### Configuração para Deploy

Certifique-se de:
1. Configurar as variáveis de ambiente no serviço de hospedagem
2. Apontar para o mesmo projeto Supabase do site principal
3. Configurar o domínio/subdomínio desejado

## 🔐 Acesso

- URL de Login: `/login`
- Credenciais: Use o mesmo usuário admin configurado no Supabase

## 🛠️ Funcionalidades

- ✅ Login seguro com Supabase
- ✅ Criar e editar posts do blog
- ✅ Editor de texto rico (ReactQuill)
- ✅ Upload de imagens
- ✅ Gerenciamento de tags e categorias
- ✅ Otimização SEO
- ✅ Publicar/despublicar posts
- ✅ Tempo de leitura automático

## 📁 Estrutura

```
admin-blog/
├── src/
│   ├── components/
│   │   └── ui/          # Componentes UI (shadcn)
│   ├── hooks/
│   │   └── useAuth.tsx  # Hook de autenticação
│   ├── lib/
│   │   ├── supabase.ts  # Cliente Supabase
│   │   └── utils.ts     # Utilitários
│   ├── pages/
│   │   ├── Login.tsx    # Página de login
│   │   ├── Dashboard.tsx # Dashboard
│   │   ├── BlogList.tsx  # Lista de posts
│   │   └── BlogForm.tsx  # Formulário de post
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## 🔗 Conexão com o Banco

Este painel utiliza a mesma instância Supabase do site principal. Certifique-se de que:
- As tabelas `blog`, `user_roles` estão criadas
- O bucket `uploads` está configurado
- As RLS policies estão ativas

## 🆘 Suporte

Em caso de dúvidas ou problemas, verifique:
1. Conexão com Supabase (variáveis de ambiente)
2. Permissões de admin do usuário na tabela `user_roles`
3. Políticas RLS configuradas corretamente
