# Instruções para Deploy no GitHub Pages

## 📋 Pré-requisitos

1. Ter uma conta no GitHub
2. Ter o Git instalado localmente
3. Ter conectado este projeto ao GitHub (via Lovable ou manualmente)

## 🚀 Passos para Deploy

### 1. Conectar ao GitHub (se ainda não conectou)

**Via Lovable:**
- Clique no botão "GitHub" no canto superior direito do Lovable
- Autorize a aplicação Lovable no GitHub
- Crie um novo repositório ou conecte a um existente

**Manualmente:**
```bash
# Inicialize o git (se necessário)
git init

# Adicione o remote do seu repositório
git remote add origin https://github.com/seu-usuario/seu-repositorio.git

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Initial commit - Setup GitHub Pages deploy"

# Envie para o GitHub
git push -u origin main
```

### 2. Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Origem), selecione:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Clique em **Save** (Salvar)

### 3. Aguardar o Deploy

- O GitHub Actions será executado automaticamente após o push
- Você pode acompanhar o progresso em **Actions** no seu repositório
- O deploy leva cerca de 2-5 minutos

### 4. Acessar seu site

Após o deploy, seu site estará disponível em:
- **URL padrão**: `https://seu-usuario.github.io/seu-repositorio/`
- **Domínio customizado**: `https://amplieseumkt.com.br` (já configurado no CNAME)

## 🔧 Configuração do Domínio Customizado

Para usar o domínio `amplieseumkt.com.br`:

1. Acesse o painel do seu provedor de domínio (Registro.br, GoDaddy, etc.)
2. Configure os seguintes registros DNS:

**Para domínio raiz (amplieseumkt.com.br):**
```
Tipo: A
Host: @
Valor: 185.199.108.153
```
```
Tipo: A
Host: @
Valor: 185.199.109.153
```
```
Tipo: A
Host: @
Valor: 185.199.110.153
```
```
Tipo: A
Host: @
Valor: 185.199.111.153
```

**Para www (opcional):**
```
Tipo: CNAME
Host: www
Valor: seu-usuario.github.io
```

3. Aguarde a propagação DNS (pode levar até 48h, mas geralmente é mais rápido)

## 🔄 Deploy Automático

Agora, sempre que você fizer push para a branch `main`, o site será automaticamente:
1. Buildado
2. Deployado no GitHub Pages

## 📦 Painel Admin (Deploy Separado)

O painel admin (`admin-blog/`) precisa ser deployado separadamente. Recomendações:

- **Vercel**: Ideal para projetos React separados
- **Netlify**: Simples e rápido
- **Outra branch GitHub Pages**: Para subdomain

Para mais detalhes, consulte `admin-blog/README.md`

## ⚙️ Variáveis de Ambiente

Não esqueça de configurar as variáveis de ambiente do Supabase:
- No GitHub: Settings > Secrets and variables > Actions
- Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

## 🆘 Problemas Comuns

**Erro 404 ao acessar rotas:**
- O arquivo `public/404.html` já está configurado
- Se persistir, verifique se o build está correto

**Deploy falhou:**
- Verifique os logs em Actions
- Certifique-se que todas as dependências estão instaladas
- Verifique se o build local funciona: `npm run build`

**Domínio não funciona:**
- Verifique se os registros DNS estão corretos
- Aguarde a propagação DNS
- Verifique se o CNAME está em `public/CNAME`

## 📚 Recursos

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Configurar Domínio Customizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions](https://docs.github.com/en/actions)
