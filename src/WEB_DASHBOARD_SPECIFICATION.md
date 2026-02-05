# 📋 Especificação Funcional: Dashboard Web de Análise de Crédito

Este documento define a estrutura de telas, componentes e filtros para o dashboard web do projeto.

---

## 🎯 Estrutura Geral

**Total de Abas:** 3  
**Navegação:** Menu horizontal no topo (Tabs) ou menu lateral  
**Filtros Globais:** Persistem entre todas as abas

---

## 🌐 Filtros Globais (Aplicam-se a todas as abas)

Estes filtros devem estar visíveis em todas as páginas, preferencialmente no topo ou lateral esquerda:

1. **Filtro: Ano**
   - Tipo: Seletor múltiplo (Checkboxes ou Dropdown)
   - Valores: Lista dinâmica de anos presentes nos dados
2. **Filtro: Período (Ano-Mês)**
   - Tipo: Range Selector (Data Inicial - Data Final)
   - Formato: MM/YYYY

3. **Filtro: Gênero**
   - Tipo: Dropdown ou Botões Toggle
   - Valores: Masculino, Feminino, Todos

4. **Filtro: Tipo de Contrato**
   - Tipo: Dropdown
   - Valores: Cash Loans, Revolving Loans, Consumer Loans, Todos

5. **Filtro: Faixa Etária**
   - Tipo: Checkboxes
   - Valores: <25, 25-35, 35-45, 45-60, 60+

---

# 📄 Aba 1: Panorama Executivo

## **Nome da Aba:** "Visão Geral"

### **Objetivo:**

Responder: _"Qual o tamanho e a evolução do negócio?"_

---

### **Componentes (Dashboards):**

#### 1. Banner de KPIs (Topo)

**Layout:** 4 cards lado a lado, ocupando largura total

**Card 1: Volume Total**

- **Nome:** Volume Total da Carteira
- **Métrica:** Soma do valor de crédito concedido
- **Formato:** R$ X.XXX.XXX.XXX,XX
- **Ícone:** 💰

**Card 2: Ticket Médio**

- **Nome:** Ticket Médio por Contrato
- **Métrica:** Média do valor de crédito
- **Formato:** R$ XXX.XXX,XX
- **Ícone:** 🎯

**Card 3: Quantidade de Contratos**

- **Nome:** Total de Contratos Ativos
- **Métrica:** Contagem de registros únicos
- **Formato:** XX.XXX contratos
- **Ícone:** 📋

**Card 4: Taxa de Inadimplência**

- **Nome:** Inadimplência Geral
- **Métrica:** Percentual de contratos inadimplentes
- **Formato:** X,XX%
- **Tipo:** Gauge/Velocímetro (com meta visual em 8%)
- **Ícone:** ⚠️

---

#### 2. Gráfico de Evolução Temporal

**Nome:** Evolução do Volume ao Longo do Tempo

- **Tipo:** Gráfico de Linha (Line Chart)
- **Eixo X:** Mês/Ano (formato: Jan/2024, Fev/2024...)
- **Eixo Y Primário:** Volume Total (R$)
- **Eixo Y Secundário:** Quantidade de Contratos
- **Interatividade:** Hover mostra valores exatos, Click filtra demais gráficos

---

#### 3. Distribuição por Categoria

**Nome:** Volume por Tipo de Renda

- **Tipo:** Gráfico de Barras Horizontal (Horizontal Bar Chart)
- **Eixo Y:** Categorias de Tipo de Renda
- **Eixo X:** Volume Total (R$)
- **Ordenação:** Decrescente por volume
- **Interatividade:** Click em barra filtra dashboard

---

#### 4. Segmentação Demográfica

**Nome:** Distribuição por Faixa Etária

- **Tipo:** Gráfico de Pizza (Pie Chart) ou Donut Chart
- **Segmentos:** Faixas etárias (<25, 25-35, etc.)
- **Métrica:** Percentual do volume total
- **Interatividade:** Click em fatia destaca categoria

---

### **Filtros Específicos da Aba:**

- **Filtro: Tipo de Renda**
  - Tipo: Dropdown
  - Valores: Working, Commercial Associate, Pensioner, State Servant, Todos

---

# 🚨 Aba 2: Saúde e Risco

## **Nome da Aba:** "Análise de Risco"

### **Objetivo:**

Responder: _"Onde estão os problemas e oportunidades de melhoria?"_

---

### **Componentes (Dashboards):**

#### 1. Indicador de Saúde Principal

**Nome:** Status de Inadimplência vs Meta

- **Tipo:** Gauge (Velocímetro)
- **Métrica:** Taxa de Inadimplência Atual
- **Meta Visual:** Linha de referência em 8%
- **Zonas de Cor:**
  - 0-5%: Verde (Saudável)
  - 5-8%: Amarelo (Atenção)
  - 8%+: Vermelho (Crítico)

---

#### 2. Matriz de Risco

**Nome:** Heatmap: Inadimplência por Escolaridade vs Tipo de Renda

- **Tipo:** Heatmap (Matriz de Calor)
- **Linhas:** Escolaridade (Higher Education, Secondary, Incomplete Higher, etc.)
- **Colunas:** Tipo de Renda (Working, Pensioner, etc.)
- **Cor da Célula:** Intensidade baseada na Taxa de Inadimplência
  - Verde claro: Baixo risco
  - Vermelho escuro: Alto risco
- **Interatividade:** Hover mostra taxa exata, Click filtra

---

#### 3. Análise de Concentração de Risco

**Nome:** Top 5 Segmentos Mais Críticos

- **Tipo:** Tabela Ordenada (Data Table)
- **Colunas:**
  1. Categoria (ex: "Higher Education + Working")
  2. Qtd Contratos
  3. Taxa de Inadimplência (%)
  4. Volume Exposto (R$)
- **Ordenação:** Por Taxa de Inadimplência (Decrescente)
- **Limite:** Top 5
- **Destaque Visual:** Primeira linha em vermelho

---

#### 4. Distribuição de Risco por Idade

**Nome:** Inadimplência por Faixa Etária

- **Tipo:** Gráfico de Barras Vertical (Column Chart)
- **Eixo X:** Faixas Etárias
- **Eixo Y:** Taxa de Inadimplência (%)
- **Linha de Referência:** Média geral (linha pontilhada)
- **Cores:** Verde (abaixo da média) / Vermelho (acima da média)

---

#### 5. Risco Relativo por Categoria

**Nome:** Indicadores de Risco Relativo

- **Tipo:** Lista de Badges/Pills
- **Métrica:** Risco Relativo (valor normalizado onde 1.0 = média)
- **Categorias Exibidas:**
  - Cadastro Recente (doc < 1 ano)
  - Idade Avançada (>60 anos)
  - Baixa Escolaridade
  - Desempregado
- **Formato:** "Cadastro Recente: 1.35x" (significa 35% acima da média)
- **Cor:** Verde (<0.8), Amarelo (0.8-1.2), Vermelho (>1.2)

---

### **Filtros Específicos da Aba:**

- **Filtro: Nível de Risco**
  - Tipo: Radio Buttons
  - Valores: Baixo (<5%), Médio (5-8%), Alto (>8%), Todos

---

# 🎯 Aba 3: Estratégia e Oportunidades

## **Nome da Aba:** "Inteligência de Negócio"

### **Objetivo:**

Responder: _"O que fazer para maximizar resultados?"_

---

### **Componentes (Dashboards):**

#### 1. Card de Oportunidade Cross-Sell

**Nome:** Potencial de Ativação (Cross-Sell)

- **Tipo:** Card Destacado (Hero Card)
- **Métrica:** Quantidade de clientes elegíveis para novo produto
- **Critério:** Clientes adimplentes + Com histórico aprovado
- **Formato:** "XX.XXX clientes prontos para ativação"
- **Ícone:** 💎
- **Call-to-Action:** "Ver lista de clientes"

---

#### 2. Ranking de Canais

**Nome:** Eficiência por Canal de Venda

- **Tipo:** Gráfico de Barras Horizontal (Ranking)
- **Eixo Y:** Canais (Credit and Cash Offices, Country-Wide, etc.)
- **Eixo X:** Score de Eficiência (métrica composta)
  - Cálculo: (Taxa Aprovação × Volume) / Taxa Inadimplência
- **Ordenação:** Decrescente (melhor canal no topo)
- **Cores:** Gradiente Verde (top) → Vermelho (bottom)

---

#### 3. Análise de Rentabilidade

**Nome:** Matriz: Ticket Médio vs Inadimplência

- **Tipo:** Scatter Plot (Gráfico de Dispersão)
- **Eixo X:** Ticket Médio (R$)
- **Eixo Y:** Taxa de Inadimplência (%)
- **Tamanho da Bolha:** Quantidade de Contratos
- **Rótulo da Bolha:** Categoria (ex: "Higher Education")
- **Zonas Guiadas:**
  - Quadrante Superior Direito: Alto Ticket + Alto Risco (zona vermelha)
  - Quadrante Inferior Direito: Alto Ticket + Baixo Risco (zona verde - sweet spot)

---

#### 4. Tabela de Rentabilidade por Produto

**Nome:** Performance Detalhada por Tipo de Contrato

- **Tipo:** Tabela Interativa (Data Table)
- **Colunas:**
  1. Tipo de Contrato
  2. Volume Total (R$)
  3. Qtd Contratos
  4. Ticket Médio (R$)
  5. Taxa Inadimplência (%)
  6. Score de Saúde (0-100)
- **Ordenação Padrão:** Por Volume (Decrescente)
- **Formatação Condicional:**
  - Barra de progresso na coluna "Score de Saúde"
  - Destaque vermelho em taxas > 8%

---

#### 5. Simulador de Impacto (Opcional Avançado)

**Nome:** Simulador: E se aumentarmos a aprovação?

- **Tipo:** Widget Interativo (Slider + Card de Resultado)
- **Input:** Slider de % de aumento na aprovação (0% a 50%)
- **Output:** Impacto estimado:
  - Aumento de Volume (R$)
  - Aumento de Contratos (#)
  - Aumento de Inadimplência Projetada (%)
- **Fórmula:** Taxa Inadimp Simulada = Taxa Atual × (1 + % Aprovação × 0.2)

---

### **Filtros Específicos da Aba:**

- **Filtro: Canal de Venda**
  - Tipo: Dropdown
  - Valores: Lista dinâmica dos canais presentes nos dados

- **Filtro: Tipo de Produto**
  - Tipo: Checkboxes
  - Valores: Cash, Cards, POS, Todos

---

# 📊 Resumo de Componentes por Aba

## Aba 1: Visão Geral

1. Banner de 4 KPIs (Cards)
2. Gráfico de Linha (Evolução Temporal)
3. Gráfico de Barras (Distribuição por Categoria)
4. Gráfico de Pizza (Segmentação Demográfica)

**Total de Componentes:** 7 (4 cards + 3 gráficos)

---

## Aba 2: Análise de Risco

1. Gauge (Indicador de Saúde)
2. Heatmap (Matriz de Risco)
3. Tabela (Top 5 Críticos)
4. Gráfico de Barras (Risco por Idade)
5. Lista de Badges (Indicadores de Risco Relativo)

**Total de Componentes:** 5

---

## Aba 3: Inteligência de Negócio

1. Card Destacado (Cross-Sell)
2. Gráfico de Barras (Ranking de Canais)
3. Scatter Plot (Análise de Rentabilidade)
4. Tabela (Performance por Produto)
5. Widget Interativo (Simulador - Opcional)

**Total de Componentes:** 4-5 (último opcional)

---

# 🔗 Fluxo de Navegação Sugerido

```
Usuário entra → Aba 1 (Visão Geral)
       ↓
   Identifica volume/evolução
       ↓
   Clica em Aba 2 (Análise de Risco) → Vê onde estão os problemas
       ↓
   Clica em Aba 3 (Inteligência) → Descobre oportunidades de ação
```

---

# ✅ Checklist de Implementação

- [ ] Criar estrutura de 3 abas/páginas
- [ ] Implementar filtros globais (5 filtros)
- [ ] **Aba 1:** Criar 7 componentes
- [ ] **Aba 2:** Criar 5 componentes
- [ ] **Aba 3:** Criar 4-5 componentes
- [ ] Testar interatividade entre filtros e gráficos
- [ ] Validar responsividade mobile (se aplicável)
- [ ] Integrar com API/Backend de dados

---

_Especificação gerada para projeto web - Adaptado da metodologia Agentic Power BI_
