-- ===========================================
-- PIPELINE CRÉDITO - SUPABASE DATABASE SETUP
-- Execute este SQL no SQL Editor do Supabase
-- ===========================================

-- 1. Criar tabela de perfis de usuário (extensão do auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT,
  cargo TEXT,
  perfil_tipo TEXT DEFAULT 'visualizador' CHECK (perfil_tipo IN ('admin', 'socio', 'analista', 'visualizador')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Criar tabela de visualizações disponíveis
CREATE TABLE IF NOT EXISTS public.visualizacoes (
  id SERIAL PRIMARY KEY,
  nome TEXT UNIQUE NOT NULL,
  descricao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criar tabela de permissões por perfil
CREATE TABLE IF NOT EXISTS public.perfil_visualizacoes (
  id SERIAL PRIMARY KEY,
  perfil_tipo TEXT NOT NULL CHECK (perfil_tipo IN ('admin', 'socio', 'analista', 'visualizador')),
  visualizacao_id INTEGER REFERENCES public.visualizacoes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(perfil_tipo, visualizacao_id)
);

-- 4. Inserir visualizações padrão
INSERT INTO public.visualizacoes (nome, descricao) VALUES
  ('visao_geral', 'Visão Geral - Panorama Executivo'),
  ('credito_risco', 'Crédito & Risco - Análise de Saúde'),
  ('financeiro', 'Financeiro - Controle Financeiro'),
  ('juridico', 'Jurídico - Gestão de Processos'),
  ('bi', 'Business Intelligence - Análise Estratégica')
ON CONFLICT (nome) DO NOTHING;

-- 5. Inserir permissões padrão
-- Admin tem acesso a tudo
INSERT INTO public.perfil_visualizacoes (perfil_tipo, visualizacao_id)
SELECT 'admin', id FROM public.visualizacoes
ON CONFLICT DO NOTHING;

-- Sócio tem acesso a tudo
INSERT INTO public.perfil_visualizacoes (perfil_tipo, visualizacao_id)
SELECT 'socio', id FROM public.visualizacoes
ON CONFLICT DO NOTHING;

-- Analista tem acesso a visão geral, crédito/risco e financeiro
INSERT INTO public.perfil_visualizacoes (perfil_tipo, visualizacao_id)
SELECT 'analista', id FROM public.visualizacoes WHERE nome IN ('visao_geral', 'credito_risco', 'financeiro')
ON CONFLICT DO NOTHING;

-- Visualizador tem acesso apenas à visão geral
INSERT INTO public.perfil_visualizacoes (perfil_tipo, visualizacao_id)
SELECT 'visualizador', id FROM public.visualizacoes WHERE nome = 'visao_geral'
ON CONFLICT DO NOTHING;

-- 6. Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfil_visualizacoes ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de segurança para profiles
-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Admins podem ver todos os perfis
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND perfil_tipo = 'admin'
    )
  );

-- Usuários podem atualizar seu próprio perfil (exceto perfil_tipo)
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins podem atualizar qualquer perfil
CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND perfil_tipo = 'admin'
    )
  );

-- Permitir inserção de perfil ao criar usuário
CREATE POLICY "Enable insert for authentication"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 8. Políticas para visualizacoes (todos podem ler)
CREATE POLICY "Anyone can view visualizacoes"
  ON public.visualizacoes
  FOR SELECT
  TO authenticated
  USING (true);

-- 9. Políticas para perfil_visualizacoes
CREATE POLICY "Anyone can view perfil_visualizacoes"
  ON public.perfil_visualizacoes
  FOR SELECT
  TO authenticated
  USING (true);

-- Apenas admins podem modificar permissões
CREATE POLICY "Admins can manage perfil_visualizacoes"
  ON public.perfil_visualizacoes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND perfil_tipo = 'admin'
    )
  );

-- 10. Função para criar perfil automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, cargo, perfil_tipo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'cargo', 'Analista'),
    'visualizador'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Trigger para criar perfil ao registrar usuário
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 13. Trigger para updated_at em profiles
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ===========================================
-- CRIAÇÃO DE USUÁRIO ADMIN INICIAL
-- Execute APÓS criar o primeiro usuário via registro
-- ===========================================

-- Para promover um usuário a admin, execute:
-- UPDATE public.profiles 
-- SET perfil_tipo = 'admin' 
-- WHERE id = 'UUID_DO_USUARIO';

-- Ou pelo email:
-- UPDATE public.profiles 
-- SET perfil_tipo = 'admin' 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'seu@email.com');
