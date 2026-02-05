# Pipeline Crédito - Rama Advogados

Dashboard executivo para gestão de crédito com autenticação, perfis de usuário e controle de permissões.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Deploy Rápido

### 1. Configurar Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **SQL Editor**
3. Cole e execute o conteúdo do arquivo `supabase-setup.sql`
4. Isso criará todas as tabelas e permissões necessárias

### 2. Deploy na Vercel

1. Faça push deste projeto para seu repositório GitHub
2. Acesse [Vercel](https://vercel.com)
3. Clique em "New Project"
4. Importe o repositório `Projeto-00`
5. A Vercel detectará automaticamente que é um projeto Vite
6. Clique em "Deploy"

### 3. Primeiro Acesso

1. Acesse a URL gerada pela Vercel
2. Clique em "Cadastre-se" para criar o primeiro usuário
3. Verifique seu email (Supabase envia confirmação)
4. Após confirmar, faça login

### 4. Promover Usuário a Admin

Após criar sua conta, execute no SQL Editor do Supabase:

```sql
UPDATE public.profiles 
SET perfil_tipo = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'seu@email.com');
```

---

## 📁 Estrutura do Projeto

```
pipeline-credito/
├── src/
│   ├── components/
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── dashboard/      # Componentes do dashboard
│   │   ├── layout/         # Sidebar, Header, DashboardLayout
│   │   └── ui/             # MetricCard, GaugeChart, ProgressBar
│   ├── contexts/
│   │   └── AuthContext.jsx # Gerenciamento de autenticação
│   ├── lib/
│   │   └── supabase.js     # Cliente Supabase
│   ├── pages/
│   │   ├── VisaoGeral.jsx
│   │   ├── CreditoRisco.jsx
│   │   ├── BusinessIntelligence.jsx
│   │   ├── GerenciarUsuarios.jsx
│   │   └── GerenciarPerfis.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── supabase-setup.sql      # Script de configuração do banco
├── vercel.json             # Configuração da Vercel
└── package.json
```

---

## 🔐 Sistema de Autenticação

### Funcionalidades

- ✅ Login com email/senha
- ✅ Cadastro de novos usuários
- ✅ Recuperação de senha
- ✅ Confirmação de email
- ✅ Sessão persistente

### Perfis de Usuário

| Perfil | Descrição | Permissões |
|--------|-----------|------------|
| **Admin** | Acesso total | Todas as telas + Gerenciamento |
| **Sócio** | Acesso completo | Todas as visualizações |
| **Analista** | Acesso operacional | Visão Geral, Crédito, Financeiro |
| **Visualizador** | Acesso básico | Apenas Visão Geral |

---

## 📊 Telas do Dashboard

### 1. Visão Geral (Panorama Executivo)
- Volume total de crédito
- Ticket médio
- Total de contratos
- Taxa de inadimplência
- Evolução do volume estratégico
- Distribuição por renda
- Composição da carteira

### 2. Crédito & Risco (Saúde e Risco)
- Status de inadimplência vs meta
- Heatmap: Escolaridade x Tipo de Renda
- Top 5 segmentos críticos
- Inadimplência por faixa etária
- Indicadores de risco relativo

### 3. Business Intelligence
- Potencial de ativação (Cross-Sell)
- Eficiência por canal de venda
- Matriz Sweet Spot
- Performance por tipo de contrato
- Simulador de expansão

### 4. Administração (Admin)
- Gerenciamento de usuários
- Configuração de perfis
- Matriz de permissões

---

## 🛠 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 🎨 Design System

### Cores
- **Primary Black**: `#000000`
- **Dark Teal**: `#004D40`
- **Bright Teal**: `#26A69A`
- **Deep Teal**: `#002D26`
- **Critical Red**: `#E53935`

### Fontes
- **Títulos**: Cinzel (serif)
- **Dados**: Montserrat (sans-serif)

### Componentes
- Glassmorphism cards
- Chess grid background
- Teal glow effects
- Material Symbols icons

---

## 📝 Variáveis de Ambiente

O projeto já vem configurado com as credenciais do Supabase. Se precisar alterar:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

---

## 🔧 Solução de Problemas

### Erro "Invalid login credentials"
- Verifique se o email foi confirmado
- Confira se a senha está correta

### Usuário não aparece na lista
- Execute o SQL de setup novamente
- Verifique se o trigger de criação de perfil está ativo

### Permissões não funcionam
- Certifique-se que as policies RLS estão ativas
- Verifique se o perfil_tipo está correto no banco

---

## 📄 Licença

Projeto privado - Rama Advogados © 2024
