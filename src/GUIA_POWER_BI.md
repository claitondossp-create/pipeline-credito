# Guia Power BI 📊

## Modelo de Dados
O modelo utiliza um esquema Star Schema (recomendado) ou Snowflake dependendo da complexidade.

- **Tabelas Fato**:
  - `fApplication`: Dados das solicitações de crédito (`application_data.csv`).
  - `fPreviousApplication`: Histórico de solicitações anteriores.
  
- **Tabelas Dimensão** (Sugeridas/Criadas via ETL):
  - `dCliente`: Dados demográficos (Gênero, Idade, Escolaridade).
  - `dTempo`: Calendário para análises temporais.
  - `dProduto`: Tipos de contrato e produtos.

## Medidas DAX Principais

### Volume e Carteira
```dax
Total Volume Carteira = SUM(fApplication[AMT_CREDIT])
Ticket Médio = AVERAGE(fApplication[AMT_CREDIT])
Qtd Contratos = COUNTROWS(fApplication)
```

### Risco e Inadimplência
```dax
Taxa Inadimplência = 
DIVIDE(
    CALCULATE(COUNTROWS(fApplication), fApplication[TARGET] = 1),
    COUNTROWS(fApplication),
    0
)

Risco Relativo = 
DIVIDE(
    [Taxa Inadimplência],
    CALCULATE([Taxa Inadimplência], ALL(fApplication))
)
```

## Perguntas Matadoras & Insights Avançados (Bônus)

Além das perguntas originais, incluímos 3 análises críticas para alavancar a estratégia:

### 1. Potencial de Cross-Selling por Perfil de Risco
**Pergunta:** Quais clientes com bons scores em aplicações anteriores estão subutilizados?
**Insight:** Identificar "Dinheiro na Mesa".
**Medida DAX:**
```dax
Cross Sell Potencial = 
CALCULATE(
    COUNTROWS(fApplication),
    fApplication[TARGET] = 0,
    NOT(ISBLANK(RELATED(fPreviousApplication[SK_ID_PREV]))),
    fPreviousApplication[NAME_CONTRACT_STATUS] = "Approved"
)
```

### 2. Eficiência de Canal (CAC vs LTV Proxy)
**Pergunta:** Qual canal de aquisição traz o menor risco com maior ticket?
**Insight:** Otimização de Budget de Marketing.
**Medida DAX:**
```dax
Efic Canal Score = 
DIVIDE(
    [Ticket Médio] * (1 - [Taxa Inadimplência]),
    1000 -- Custo Base Simulado por Cliente
)
```

### 3. Indicadores Precoces de Atrito (Early Warning)
**Pergunta:** Mudanças cadastrais recentes predizem default?
**Insight:** Prevenção à fraude e risco.
**Medida DAX:**
```dax
Risco Cadastro Recente = 
CALCULATE(
    [Taxa Inadimplência],
    FILTER(fApplication, fApplication[DAYS_ID_PUBLISH] > -365) -- Documento alterado no último ano
)
```
